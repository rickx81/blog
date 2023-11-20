---
date: 2023-11-10 20:00:00
tags:
  - JavaScript
  - 面试题
title: Javascript 面试题
---

## javascript 的数据类型有哪些?

- 基本类型
  > - String
  > - Number
  > - Boolean
  > - Null
  > - Undefined
  > - Symbol
  > - BigInt
- 引用类型
  > - Object
  > - Array
  > - Function
  > - RegExp
  > - Date

## 如何判断 javascript 的数据类型?

- typeof
  > ```js
  > typeof ""; // string 有效
  > typeof 1; // number 有效
  > typeof Symbol(); // symbol 有效
  > typeof true; // boolean 有效
  > typeof undefined; // undefined 有效
  > typeof null; // object 无效
  > typeof []; // object 无效
  > typeof new Function(); // function 有效
  > typeof new Date(); // object 无效
  > typeof new RegExp(); // object 无效
  > ```
- instanceof
  > ```js
  > [] instanceof Array // true
  > {} instanceof Object // true
  > new Date() instanceof Date // true
  > function Person(){}
  > new Person() instanceof Person // true
  > [] instanceof Object // true
  > new Date() instanceof Object // true
  > new Person instanceof Object // true
  > ```
- constructor
- Object.prototype.toString
  > ```js
  > Object.prototype.toString.call(""); // [object String]
  > Object.prototype.toString.call(1); // [object Number]
  > Object.prototype.toString.call(true); // [object Boolean]
  > Object.prototype.toString.call(Symbol()); //[object Symbol]
  > Object.prototype.toString.call(undefined); // [object Undefined]
  > Object.prototype.toString.call(null); // [object Null]
  > Object.prototype.toString.call(new Function()); // [object Function]
  > Object.prototype.toString.call(new Date()); // [object Date]
  > Object.prototype.toString.call([]); // [object Array]
  > Object.prototype.toString.call(new RegExp()); // [object RegExp]
  > Object.prototype.toString.call(new Error()); // [object Error]
  > Object.prototype.toString.call(document); // [object HTMLDocument]
  > Object.prototype.toString.call(window); // [object global] window 是全局对象 global 的引用
  > ```

## 怎么判断两个对象相等?

> - Object.is(obj1, obj2)
> - obj1 === obj2
> - 递归
> - lodash.isEqual(value, other)

## 如何判断空对象?

> - lodash.isEmpty(obj)

## 0.1 ＋ 0.2 为什么不等于 0.3 ?(解释原理)

## 强制类型转换、隐式类型转换分别是什么，列举场景说明。

> 显式强制类型转换基本类型之间的转换
>
> ```js
> // 转换成数字类型
> Number("123"); // 123
> Number(123); // 123
> Number(false); // 0
> Number(true); // 1
> Number(null); // 0
> Number(undefined); // NaN
> Number("学习"); // NaN
> Number(""); // 0
> // 转换成字符串类型
> String(123); // "123"
> String(false); // "false"
> String(true); // "true"
> String(null); // "null"
> String(undefined); // "undefined"
>
> // 引用类型强制转换成数字类型和字符串类型
> // 转换成数字类型过程
> // 1.调用对象自带的 valueOf 方法，若返回的是一个基本类型数据，就转换成数字类型返回
> // 2.i周用又j象白的toString方法，若返回的是一个基本数据类型，就转换成数亨类型返回
> // 3.报错
>
> Number([]); // 0
> // []调用valueOf返回的是[]，不是基本数据类型;所以[]调用tostring方法，返回的是""，字符串是基本数据类型，转换成数字> 类型就是0，所以最终结果是0
> Number(); // NaN
> // 仍调用valueOf返回的是登，不是基本数据类型，所以鲁调用tostring方法，返回字符串类型'[object,object]'，转化成数字类型就是NaN
>
> // 提高:
> Number([0]); // 0
> Number([1, 1]); // NaN
>
> // 对象转换成字符串类型过程
> // 1.调用对象自带的toString方法，若返回的是一个基本类型数据，就转换成数字类型返回
> // ⒉调用对象的valueOf方法，若返回的是一个基本数据类型，就转换成数字类型返回
> // 3.报错
> string([]); // """
> string(); // "[object,object]"
> ```

## 创建函数的几种方式?

- 函数声明
  > ```js
  > function sum1(num1, num2) {
  >   return num1 + num2;
  > }
  > ```
- 函数表达式（ 函数字面量）
  > ```js
  > const sum2 = function (num1, num2) {
  >   return num1 + num2;
  > };
  > ```
- 箭头函数
  > ```js
  > const sum3 = (num1, num2) => num1 + num2;
  > ```
- 函数对象方式（不推荐）
  > ```js
  > const sum4 = new Function("sum1", "sum2", "return sum1 + sum2");
  > ```

## javascript 创建对象的几种方式?

- 工厂模式
- 构造函数模式
- 原型模式
- 构造函数和原型组合模式
- 动态原型模式
- 寄生构造模式
- 稳妥构造模式

## 列举宿主对象、内置对象、原生对象并说明其定义。

- 原生对象

  > ECMA-262 把原生对象定义为“独立于宿主环境的 ECMAScript 实现提供的对象”。

  包含： Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、ActiveXObject(服务器方面)、Enumerator(集合遍历类)、RegExp（正则表达式）

- 内置对象

  > ECMA-262 把内置对象（built-in object）定义为“由 ECMAScript 实现提供的、独立于宿主环境的所有对象，在 ECMAScript 程序开始执行时出现”。这意味着开发者不必明确实例化内置对象，它已被实例化了。

  同样是“独立于宿主环境”。ECMA-262 只定义了两个内置对象，即 Global 和 Math （它们也是原生对象，根据定义，每个内置对象都是原生对象）

- 宿主对象

  > ECMAScript 中的“宿主”当然就是我们网页的运行环境，即“操作系统”和“浏览器”。

  BOM 和 DOM 都是宿主对象。因为其对于不同的“宿主”环境所展示的内容不同。其实说白了就是，ECMAScript 官方未定义的对象都属于宿主对象，因为其未定义的对象大多数是自己通过 ECMAScript 程序创建的对象

## === 和 == 的区别?

## null, undefined 的区别

- null
  > 值 null 是一个字面量，不像 undefined ，它不是全局对象的一个属性。null 是表示缺少的标识，指示变量未指向任何对象。把 null 作为尚未创建的对象，也许更好理解。在 API 中，null 常在返回类型应是一个对象，但没有关联的值的地方使用。
- undefined
  > undefined 是 全局对象 的一个属性。也就是说，它是全局作用域的一个变量。undefined 的最初值就是原始数据类型 undefined 。

## 什么情况下会返回 undefined 值?

- 访问声明，但是没有初始化的变量

```js
let aaa;
console.log(aaa); // undefined
```

- 访问不存在的属性

```js
let aaa = {};
console.log(aaa.c); // undefined
```

- 访问函数的参数没有被显式的传递值

```js
(function (b) {
  console.log(b); // undefined
})();
```

- 访问任何被设置为 undefined 值的变量

```js
let aaa = undefined;
console.log(aaa); // undefined
```

- 没有定义 return 的函数隐式返回

```js
function aaa() {}
console.log(aaa()); // undefined
```

- 函数 return 没有显式的返回任何内容

```js
function aaa() {
  return;
}
console.log(aaa()); // undefined
```

## 如何区分数组和对象?

## 多维数组如何降维?

## 怎么获取当前日期(年-月-日时:分:秒)?

## 什么是类数组(伪数组)，如何将其转化为真实的数组?

## 如何遍历对象的属性?

> | 方法/属性                  | 可枚举 | 不可枚举 | Symbol | 原型 |
> | -------------------------- | :----: | :------: | :----: | :--: |
> | for in                     |   是   |    否    |   否   |  是  |
> | Object.keys()              |   是   |    否    |   否   |  否  |
> | Object.getOwnPropertyNames |   是   |    是    |   否   |  否  |
> | Reflect.ownKeys            |   是   |    是    |   是   |  否  |
>
> ```js
> let obj = Object.create({
>   e: 5,
> });
> obj.a = 1;
> obj.b = 2;
> obj[Symbol("c")] = 3;
> Reflect.defineProperty(obj, "d", {
>   enumerable: false,
>   value: 4,
> });
> // for in
> for (let key in obj) {
>   console.log(key); // a, b, e
> }
> // Object.keys
> console.log(Object.keys(obj)); // [ 'a', 'b' ]
> // getOwnPropertyNames
> console.log(Object.getOwnPropertyNames(obj)); // [ 'a', 'b', 'd' ]
> // ownKeys
> console.log(Reflect.ownKeys(obj)); // [ 'a', 'b', 'd', Symbol(c) ]
> ```

## 如何给一个按钮绑定两个 onclick 事件?

- onclick

```html
<button onclick="test1();test2();return console.log('test3')">Button</button>
```

- `addEventListener`

## 变量提升是什么?与函数提升的区别?

## 什么是作用域链?如何延长?

> 作用域的集合就是作用域链（子集可以访问父集，父集不能访问子集）  
> 延长作用于链：
>
> - with 关键字
> - try-catch 中的 catch

## 如何实现数组的随机排序?

- sort
- 创建一个新的数组，从原数组中随机抽取一个元素插入到新数组中，然后返回新数组
- 数组内的元素随机替换位置
- 洗牌算法
  ```js
  function shuffle(arr) {
    const result = [];
    let random;
    while (arr.length > 0) {
      random = Math.floor(Math.random() * arr.length);
      result.push(arr[random]);
      arr.splice(random, 1);
    }
    return result;
  }
  ```

## dom 节点的 Attribute 和 Property 有何区别?

| HTML Attribute （特性）       | DOM Property （属性）          |
| :---------------------------- | :----------------------------- |
| 值永远是字符串或 null         | 值可以是任意合法 js 类型       |
| 大小写不敏感                  | 大小写敏感                     |
| 不存在时返回 null             | 不存在时返回 undefined         |
| 对于 href，返回 html 设置的值 | 对于 href 返回解析后的完整 url |
| 更新 value，属性也更新        | 更新 value，特性不更新         |

## dom 结构操作怎样添加、移除、移动、复制、创建和查找节点?

- 添加节点：`appendChild()` 或 `insertBefore()`
- 移除节点：`removeChild()`
- 移动节点：`appendChild()` 或 `insertBefore()`
- 复制节点：`cloneNode()`
- 创建节点：`createElement()` 或 `createTextNode()`
- 查找节点：`getElementById()`, `getElementsByClassName()`, `getElementsByTagName()`, `querySelector()` 和 `querySelectorAll()`

## 什么是事件冒泡，它是如何工作的?如何阻止事件冒泡?

> 当一个元素接收到事件的时候，会把他接收到的事件传给自己的父级，一直到 window （注意这里传递的仅仅是事件，例如 click、focus 等等这些事件， 并不传递所绑定的事件函数。）
>
> 阻止事件冒泡： `event.stopPropagation()`;

## 什么是事件捕获，它是如何工作的?

> 当鼠标点击或者触发 dom 事件时（被触发 dom 事件的这个元素被叫作事件源），浏览器会从根节点 =>事件源（由外到内）进行事件传播。

## 如何让事件先冒泡后捕获?

## JavaScript 动画和 CSS3 动画有什么区别?

- ### JS 动画（逐帧动画）
  首先，在 js 动画是逐帧动画，是在时间帧上逐帧绘制帧内容，由于是一帧一帧的话，所以他的可操作性很高，几乎可以完成任何你想要的动画形式。但是由于逐帧动画的帧序列内容不一样，会增加制作负担，且资源占有比较大。但它的优势也很明显：因为它相似与电影播放模式，很适合于表演很细腻的动画，如 3D 效果、人物或动物急剧转身等等效果。但是，如果帧率过低的话，会帧与帧之间的过渡很可能会不自然、不连贯。  
  js 是单线程的脚本语言，当 js 在浏览器主线程运行时，主线程还有其他需要运行的 js 脚本、样式、计算、布局、交互等一系列任务，对其干扰线程可能出现阻塞，造成丢帧的情况。
  其次，js 在做动画的时候，其复杂度是高于 css3 的，需要考虑一些计算，操作等方便问题。  
  但是正是由于 js 对动画的操作复杂度比较高，能对动画有一个比较好的控制，如开始、暂定、回放、终止、取帧等，可以很精确的做到。因此可以 js 可以通过操作 DOM 和 BOM 来做一些酷炫的动态效果，以及爆炸特效，且兼容性比较好。
- ### css3（补间动画）
  制作方法简单方便。只需确定第一帧和最后一帧的关键位置即可，两个关键帧之间帧的内容由 Composite 线程自动生成，不需要人为处理。当然也可以多次添加关键帧的位置。  
  因为只设置几个关键帧的位置，所以在进行动画控制的时候时比较弱的。不能够在半路暂停动画，或者在动画过程中不能对其进行一些操作等。  
  css3 在实现一些简单的滑动，翻转等特效的时候会很方便，但是想要做到一些酷炫的效果的时候，其操作往往可能会比 js 操作有更多的冗余。  
  css3 在做动画的时候，浏览器可以对其进行一些优化，会比 js 使用更少的占用 cpu 资源，但是效果足够流畅。
- #### 结论：
  如果动画只是一些简单的状态切换，滑动等效果，不需要中间的控制过程，css3 是比较好的选择，它直接在 css 文件中就可以实现，并不需要引入太多的 js 库。而你想做一些复杂的客户端界面，开发一个复杂 ui 的 app，实现一个复杂纹理动画等，需要对页面进行精准的控制计算，js 是不错的选择。

## dom 的事件模型

DOM 事件模型分为捕获和冒泡。一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

1. 捕获阶段：事件从 window 对象自上而下向目标节点传播的阶段；
2. 目标阶段：真正的目标节点正在处理事件的阶段；
3. 冒泡阶段：事件从目标节点自下而上向 window 对象传播的阶段。

## 事件三要素是什么?

1. 事件源：触发(被)事件的元素
2. 事件类型：事件的触发方式(例如鼠标点击或键盘点击)
3. 事件处理程序：事件触发后要执行的代码(函数形式)

## 获取元素位置?

> Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。

## 如何绑定事件，如何解除事件?

## 对事件委托的理解

> 事件委托是利用事件的冒泡原理来实现的，大致可以分为三个步骤：
>
> 1. 确定要添加事件元素的父级元素；
> 2. 给父元素定义事件，监听子元素的冒泡事件；
> 3. 使用 event.target 来定位触发事件冒泡的子元素。

## setTimeout 和 setInterval 的区别及用法是什么?

## setTimeout 来实现 setInterval

## document.write 和 innerHTML 的区别?

> document.write 执行会导致页面的重新渲染，而 innerHTML 不会 document.write 是将内容清空在写入，而 innerHTML 是覆盖或者追加动作

## 元素拖动如何实现，原理是怎样?

## 什么是重绘(repaint)?什么是回流(reflow)?如何最小化重绘和回流?

## 延迟加载的方式有哪些?

1. defer 属性
2. async 属性
3. 动态创建 DOM 方式
4. 使用 jQuery 的 getScript()方法
5. 使用 setTimeout 延迟方法的加载时间
6. 让 JS 最后加载

## 垃圾回收机制有哪些?具体怎么如何执行?

- js 内存的生命周期
  1. 内存分配：当声明变量、函数、对象时，系统会自动分配内存给它们
  2. 内存使用：即读写内存，也就是使用变量、函数
  3. 内存回收：使用完毕，由垃圾回收器自动回收不再使用的内存
- 引用计数法
- 标记清除法（mark-and-sweep）
- 分代回收（Generational Collection）
  分代回收是一种结合了标记清除和引用计数的垃圾回收机制，它会根据对象的生命周期将内存分为不同的代。
  **老生代回收**  
  老生代实际上就是上面说到的标记清除算法，这套算法适用于存活时间较长的对象
  **新生代回收**  
  新生代堆被分为两个相等大小的区域：From 空间和 To 空间
  1. 新对象分配到 From 空间
  2. 当 From 空间满时，触发垃圾回收
  3. 从根对象开始，标记所有存活的对象
  4. 将存活的对象复制到 To 空间中
  5. 清除已经死亡的对象
  6. 将 To 空间作为新的 From 空间，并将 From 空间作为新的 To 空间，完成垃圾回收

## 什么是内存泄漏?

内存泄漏就是指申请的内存没有及时回收掉，被泄漏了

1. 意外的全局变量
   全局变量的生命周期最长，直到页面关闭前，它都存活着，所以全局变量上的内存一直都不会被回收。
   当全局变量使用不当，没有及时回收（手动赋值 null），或者拼写错误等将某个变量挂载到全局变量时，也就发生内存泄漏了。

2. 遗忘的定时器
   setTimeout 和 setInterval 是由浏览器专门线程来维护它的生命周期，所以当在某个页面使用了定时器，当该页面销毁时，没有手动去释放清理这些定时器的话，那么这些定时器还是存活着的。
   也就是说，定时器的生命周期并不挂靠在页面上，所以当在当前页面的 js 里通过定时器注册了某个回调函数，而该回调函数内又持有当前页面某个变量或某些 DOM 元素时，就会导致即使页面销毁了，由于定时器持有该页面部分引用而造成页面无法正常被回收，从而导致内存泄漏了。
   如果此时再次打开同个页面，内存中其实是有双份页面数据的，如果多次关闭、打开，那么内存泄漏会越来越严重。
   而且这种场景很容易出现，因为使用定时器的人很容易遗忘清除。

3. 使用不当的闭包
   函数本身会持有它定义时所在的词法环境的引用，但通常情况下，使用完函数后，该函数所申请的内存都会被回收了。
   但当函数内再返回一个函数时，由于返回的函数持有外部函数的词法环境，而返回的函数又被其他生命周期东西所持有，导致外部函数虽然执行完了，但内存却无法被回收。
   所以，返回的函数，它的生命周期应尽量不宜过长，方便该闭包能够及时被回收。
   正常来说，闭包并不是内存泄漏，因为这种持有外部函数词法环境本就是闭包的特性，就是为了让这块内存不被回收，因为可能在未来还需要用到，但这无疑会造成内存的消耗，所以，不宜烂用就是了。
4. 遗漏的 DOM 元素
   DOM 元素的生命周期正常是取决于是否挂载在 DOM 树上，当从 DOM 树上移除时，也就可以被销毁回收了。
   但如果某个 DOM 元素，在 js 中也持有它的引用时，那么它的生命周期就由 js 和是否在 DOM 树上两者决定了，记得移除时，两个地方都需要去清理才能正常回收它。

## 数组遍历的方法有哪些，分别有什么特点，性能如何?

- for
- forEach
- for...in
- for...of（只能遍历可迭代对象）
- map
- every
- some
- reduce
- filter

性能： for > forEach ~= for...of > map > for...in

## ES5 和 ES6 的区别，ES6 新增了什么?

## ES6 的继承和 ES5 的继承有什么区别?

## var、let、const 之间的区别?暂时性死区如何理解?

## Class、extends 是什么，有什么作用?

## 什么是 JS 闭包

> 闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

## 说一下类的创建和继承，列举一下你所知道的继承方式

## 如何解决异步回调地狱

## 说一下图片的懒加载和预加载

懒加载：

1. IntersectionObserver
2. 监听 scroll

## mouseover 和 mouseenter 的区别

- mouseover:只要鼠标指计移入事件所绑定的元素或其子元素，都会触发该事件
- mouseenter:只有鼠标指引事件所绑定的元素时，才会触发该事件

## new 操作符做了那哪些事情?

- 创建一个空的简单 JavaScript 对象（即 {}）；
- 为步骤 1 新创建的对象添加属性 **\_\_proto\_\_**，将该属性链接至构造函数的原型对象；
- 将步骤 1 新创建的对象作为 **this** 的上下文；
- 如果该函数没有返回对象，则返回 **this**。  
  （注：关于对象的 `constructor`，参见 `Object.prototype.constructor`）

## 改变函数内部 this 指针的指向函数(bind,apply，call 的区别)，内在分别是如何实现的?

- 三者都可以改变函数的 this 对象指向。
- 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window。
- 三者都可以传参，但是 apply 是数组，而 call 是参数列表，且 apply 和 call 是一次性传入参数，而 bind 可以分为多次传入。
- bind 是返回绑定 this 之后的函数，便于稍后调用；apply 、call 则是立即执行 。

## JS 的各种位置，比如 clientHeight, scrollHeight, offsetHeight ,以及 scrollTop, offsetTop, clientTop 的区别?54．异步加载 JS 的方法

- offsetHeight = 内容高度 + padding + border
- clientHeight = 内容高度 + padding
- scrollHeight = 内容实际尺寸 + padding

## Ajax 解决浏览器缓存问题

## 节流和防抖

## eval 是做什么的

## 对象深拷贝的简单实现

## 实现 JS 中所有对象的深度克隆（包装对象，Date 对象，正则对象）

```js
function deepClone(target) {
  const map = new WeakMap();

  function isObject(target) {
    return (
      (typeof target === "object" && target) || typeof target === "function"
    );
  }

  function clone(data) {
    if (!isObject(data)) {
      return data;
    }
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }
    const exist = map.get(data);
    if (exist) {
      return exist;
    }
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }
    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val);
      } else {
        result[key] = val;
      }
    });
    return result;
  }

  return clone(target);
}
```

## 实现一个 once 函数，传入函数参数只执行—次

```js
function once(fn) {
  let ret; // 缓存结果用
  return function (...args) {
    if (!fn) return ret;
    ret = fn(...args);
    fn = null; // 表示已经执行过一次
    return ret;
  };
}
```

## 将原生的 ajax 封装成 promise

```js
function Ajax(url, method, data) {
  let promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error("error"));
        }
      }
    };
    if (method.toUpperCase() === "GET") {
      let paramsList = [];
      for (let key in data) {
        paramsList.push(key + "=" + data[key]);
      }
      let params = paramsList.join("&");
      url = url + "?" + params;
      xhr.open("get", url, false);
      xhr.send();
    } else if (method.toUpperCase() === "POST") {
      xhr.open("post", url, false);
      xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=utf-8"
      );
      xhr.send(data);
    }
  });
  return promise;
}
```

## JS 监听对象属性的改变

- defineProperty
- Proxy

## 如何实现一个私有变量，用 get 可以访问，不能直接访问

## 怎么控制—次加载—张图片，加载完后再加载下—张

## 如何实现 sleep 的效果(es5 或者 es6)

```js
let sleepFun = function (fun, time) {
  setTimeout(function () {
    fun();
  }, time);
};

let sleepFun = (time) => {
  new Promise((resolve) => setTimeout(resolve, time));
};
```

## Function._proto_(getPrototypeOf)是什么?

## 箭头函数中 this 指向

## 数组常用方法有哪些

## 数组去重有哪些方法?

## 如何去除字符串首尾空格

## 说说你所知道的 JS 语言特性?

## 如何判断—个数组?

- Array.isArray([]) // true
- [] instanceof Array
- Object.prototype.toString.call([]) // [object, Array]

## JS 的全排列

```js
const permuteUnique = (nums) => {
  const res = [];
  const path = [];
  nums.sort(); // 先排序 [1,2,3,1,2,1] -> [1,1,1,2,2,3]
  const len = nums.length;
  const used = new Array(len).fill(false);

  function backtrack(used) {
    if (path.length === len) {
      res.push(Array.from(path));
      return;
    }
    for (let i = 0; i < len; i++) {
      // 如果当前已经使用或者前一个和当前相等并且前一个已使用
      if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]))
        continue;
      path.push(nums[i]);
      used[i] = true; // 同支
      backtrack(used);
      path.pop();
      used[i] = false;
    }
  }

  backtrack(used);
  return res;
};
```

## 谈谈你所理解的跨域，为什么会有这个问题?如何解决?

## null == undefined 输出什么? null === undefined 呢?

## 什么是按需加载

## 简单介绍一下 symbol

## 介绍一下 promise，及其底层如何实现

## JS 原型链，原型链的顶端是什么? Object 的原型是什么?Object 的原型的原型是什么?

## Promise + Generator + Async 的使用

## JS 中 string 的 startWith 和 indexOf 两种方法的区别

## JS 字符串转数字的方法

```js
+"-123"; // -123
Number("1.23"); // 1.23
Number("0.123a"); // NAN
parseInt("123a"); // 123
parseFloat("-123.45a"); // -123.45
```

## 平时是怎么调试 JS 的

## 怎么获得对象上的属性

```js
Object.keys(obj);
Object.getOwnPropertyNames(obj);
Reflect.ownKeys(obj);
for (let key in obj) {
}
```

## async 和 await 具体该怎么用?

## 知道哪些 ES6，ES7 的语法

## promise 和 await/async 的关系

## JS 加载过程阻塞，解决方法。

## JS 对象类型，基本对象类型以及引用对象类型的区别

## 轮播的实现原理?假如—个页面上有两个轮播，你会怎么实现?

## 解释一下 JS 的事件循环

## 解释一下 HTML5 Drag API

## 解释一下 WebWorker

## {} 和 [] 的 valueOf 和 toString 的结果是什么?

## 介绍一下 V8 隐藏类

## AMD 和 CMD 规范的区别?说一下 CommonJS、AMD 和 CMD?

## 谈谈 JS 的运行机制
