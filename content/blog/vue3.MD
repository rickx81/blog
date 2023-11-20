---
date: 2023-11-11 20:00:00
tags:
  - vue
  - nextTick
  - Scheduler
title: Vue3 Scheduler
---


# SchedulerJob

## 小结

- queueJob 接收一个函数 job 作为参数，若 job 设置了 id ，那么按 id 升序排序，否则按顺序保存到一个队列中，会去除重复的 job，job1 中嵌套的 job2 会立即执行
- queuePreFlushCb 接收一个函数 cb 作为参数，其他性质和 queueJob 相同
- queuePostFlushCb 接收一个函数 cb 或一个函数数组 cbs 作为参数，其他性质和 queueJob 相同
- queuePreFlushCb 、 queueJob 、 queuePostFlushCb 可以互相调用，且会立即执行
- 如果在嵌套的 preFlushCb 中又调用了父 job，那么这次调用会被跳过
- 在 job1 中调用 queueJob(job2) ，job2 中的 queuePostFlushCb 会在和 queueJob(job2) 同级的 queuePostFlushCb 执行后执行
- invalidateJob 可以让一个 job 不执行
- nextTick 会捕获错误
- 默认情况下不允许递归的 job 等，除非指定了 allowRecurse 为 true
- flushPostFlushCbs 会让 queuePostFlushCb 中的递归只执行一次
- 优先级：queuePreFlushCb > queueJob > queuePostFlushCb
- 如果 job 的 active 属性为 false，那么 job 不会被执行

### nextTick

```ts
const resolvedPromise = Promise.resolve() as Promise<any>;

export function nextTick<T = void>(
  this: T,
  fn?: (this: T) => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
```

其实就是用 Promise.resolve().then 将 fn 转换成一个微任务，加入微任务队列

### queueJob 入队异步任务

```ts
export function queueJob(job: SchedulerJob) {
  if (
    (!queue.length ||
      !queue.includes(
        job,
        isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
      )) &&
    job !== currentPreFlushParentJob
  ) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
```

在默认情况下，搜索的起始位置为当前任务，即不允许递归调用和重复添加

当 job.allowRecurse 的值为 true 时，将搜索起始位置加一，无法搜索到自身，也就是允许递归调用了。

然后根据有无 job.id 属性判断把任务放到最后还是按 id 升序排序，保证了队列刷新时任务能按照 id 升序正确排序

最后调用 queueFlush() 处理队列

### queuePostFlushCb 处理回调

```ts
export function queuePostFlushCb(cb: SchedulerJobs) {
  if (!isArray(cb)) {
    if (
      !activePostFlushCbs ||
      !activePostFlushCbs.includes(
        cb,
        cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
      )
    ) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    // if cb is an array, it is a component lifecycle hook which can only be
    // triggered by a job, which is already deduped in the main queue, so
    // we can skip duplicate check here to improve perf
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
```

入队的逻辑和异步任务的处理基本上是一致的。一方面做了去重，另一方面依照配置处理了递归的逻辑。 另外的，如果回调是一个数组，它会是组件的生命周期钩子函数。这组函数仅可被异步任务调用，且已经完成去重了。所以这里直接将数组拉平为一维，推入 pendingQueue 中。这部分是 Vue 自身的设计。

### queueFlush 推入微任务队列

入队完成后，我们纠结着需要开始处理异步任务了。我们先来看两个全局变量，它们控制着刷新逻辑：

```ts
let isFlushing = false;
let isFlushPending = false;

const resolvedPromise: Promise<any> = Promise.resolve();
let currentFlushPromise: Promise<void> | null = null;

// 在这里，如果没有正在等待或正在执行的任务，我们就会将 flushJobs 塞入引擎的微任务队列：

function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
```

通过这样的设计，确保了你可以在一个 tick 内可以多次添加任务。同时引擎在执行完主调用栈的函数后，一定会调用一次微任务队列中的 flushJobs。

### flushJobs 处理异步任务

我们之前通过

```ts
resolvedPromise.then(flushJobs);
```

将 flushJobs 加入到了微任务队列，那么 flushJobs 就会在引擎处理下一个微任务队列时执行

首先看一下回调的处理时机：

```ts
type CountMap = Map<SchedulerJob | SchedulerCb, number>;

function flushJobs(seen?: CountMap) {
  isFlushPending = false;
  isFlushing = true;
  if (__DEV__) {
    seen = seen || new Map();
  }

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child so its render effect will have smaller
  //    priority number)
  //    组件更新顺序是从父组件到子组件（因为父组件总是先于子组件创建，那么父组件有更小
  //    的 id，即更高的优先级）
  // 2. If a component is unmounted during a parent component's update,
  //    its update can be skipped.
  //    如果一个组件在其父组件的更新过程中被卸载，它的更新可以被跳过
  queue.sort(comparator);

  // conditional usage of checkRecursiveUpdate must be determined out of
  // try ... catch block since Rollup by default de-optimizes treeshaking
  // inside try-catch. This can leave all warning code unshaked. Although
  // they would get eventually shaken by a minifier like terser, some minifiers
  // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
  // 非生产环境下，检查是否有递归更新
  // checkRecursiveUpdates 方法的使用必须在 try ... catch 代码块之外确定，
  // 因为 Rollup 默认会在 try-catch 代码块中进行 treeshaking 优化。
  // 这可能会导致所有警告代码都不会被 treeshaking 优化。
  // 虽然它们最终会被像 terser 这样的压缩工具 treeshaking 优化，
  // 但有些压缩工具会失败（例如：https://github.com/evanw/esbuild/issues/1610)
  const check = __DEV__
    ? (job: SchedulerJob) => checkRecursiveUpdates(seen!, job)
    : NOOP;

  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (__DEV__ && check(job)) {
          continue;
        }
        // console.log(`running:`, job.id)
        callWithErrorHandling(job, null, ErrorCodes.SCHEDULER);
      }
    }
  } finally {
    // 重置 flushIndex
    flushIndex = 0;
    // 快速清空队列，直接给 数组的 length属性 赋值为 0 就可以清空数组
    queue.length = 0;

    // 刷新生命周期的回调
    flushPostFlushCbs(seen);

    // 将 isFlushing 设置为 false，表示当前刷新结束
    isFlushing = false;
    // 将 currentFlushPromise 设置为 null，表示当前没有任务需要刷新了
    currentFlushPromise = null;
    // some postFlushCb queued jobs!
    // keep flushing until it drains.
    // 有些异步任务在执行的时候也会添加新的异步任务进去
    // 继续它们也执行完
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
```

事实上就是通过这两个函数，分别执行回调函数队列的。

### flushPreFlushCbs 处理异步任务前时的回调

```ts
export function flushPreFlushCbs(
  seen?: CountMap,
  // if currently flushing, skip the current job itself
  i = isFlushing ? flushIndex + 1 : 0
) {
  if (__DEV__) {
    seen = seen || new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    // 判断队列中的人物是不是 pre 任务，如果是啧执行并从队列删除
    if (cb && cb.pre) {
      if (__DEV__ && checkRecursiveUpdates(seen!, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
```

### flushPostFlushCbs 处理异步任务处理完成后的回调

```ts
export function flushPostFlushCbs(seen?: CountMap) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;

    // #1947 already has active queue, nested flushPostFlushCbs call
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }

    activePostFlushCbs = deduped;
    if (__DEV__) {
      seen = seen || new Map();
    }

    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));

    for (
      postFlushIndex = 0;
      postFlushIndex < activePostFlushCbs.length;
      postFlushIndex++
    ) {
      if (
        __DEV__ &&
        checkRecursiveUpdates(seen!, activePostFlushCbs[postFlushIndex])
      ) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
```

flushPostFlushCbs 会处理嵌套的情况,让嵌套的函数执行一次
