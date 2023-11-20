---
date: 2023-11-10 20:00:00
tags:
  - HTML
  - CSS
  - 面试题
title: HTML&CSS 面试题
---


# HTML + CSS

## 什么是 BFC ?如何触发?有何特点?如何解决 margin"塌陷"?

> BFC 是 Block Formatting Context 的缩写,意为块级格式化上下文。它是浏览器的一块渲染区域,BFC 内部的元素布局不会影响外部的元素。
>
> ### 触发 BFC 的方式有:
>
> - float 不是 `none`
> - overflow 不是 `visible`
> - display 是 `inline-block`、` table-cell`、`flex `、`grid` 等
> - position 是 `absolute` 或 `fixed`
>
> ### BFC 的特点:
>
> - 内部的 Box 会在垂直方向一个接一个地放置。
> - 垂直方向的距离由 `margin` 决定。属于同一个 BFC 的两个相邻 Box 的 `margin` 会发生重叠。
> - BFC 的区域不会与 float 的元素区域重叠。
> - 计算 BFC 的高度时,浮动元素也参与计算。
> - BFC 就是页面上的一个隔离的独立容器,容器里面的子元素不会影响外面的元素。
>
> ### margin 塌陷:
>
> `margin` 塌陷是指两个垂直相邻的元素,它们的 `margin-top` 和 `margin-bottom` 合并在了一起,而不是像预期的那样,相邻的 `margin` 会叠加。
>
> 方法是:
>
> - 给其中一个元素设置 overflow: `hidden`
> - 给其中一个元素设置 display: `flex`/`inline-block`/`table-cell` 等
> - 给其中一个元素设置 float 非 `none`

## CSS 如何出来溢出?说一下 overflow 不同值的区别。

> overflow 选项包括裁减、显示滚动条，或者显示从容器流向周围区域的内容。
>
> 指定 visible（默认）或 clip 以外的值，会创建一个新的块级格式化上下文。由于技术原因，这是必要的——如果浮动包含滚动元素，它将在每个滚动步骤后强制重新包装内容，从而导致一个缓慢的滚动体验。
>
> 为使 overflow 具有效果，块级水平的容器必须有一个设定的高度（height 或 max-height）或 white-space 设置为 nowrap。
>
> 设置一个轴为 visible（默认值），而设置另一个轴为不同的值时，visible 的行为会像 auto 一样。
>
> JavaScript 的 Element.scrollTop 属性可用于滚动 HTML 元素，即使当 overflow 设置为 hidden 时。

## 三栏布局有什么实现方式?

## CSS calc 属性作用是什么?主要用于解决什么问题?

> calc() 此 CSS 函数允许在声明 CSS 属性值时执行一些计算。

## 有一个固定长宽 div，怎么实现在屏幕上垂直水平居中

## 描述一下渐进增强(progressive enhancement)和优雅降级(graceful degradation)

## iframe 有哪些优点?哪些缺点?用它来解决过什么问题?

> ## 优点：
>
> - iframe 能够原封不动的把嵌入的网页展现出来；
> - 如果有多个网页引用 iframe，那么只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷；
> - 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以提高提高代码的可重用性；
> - 如果遇到加载缓慢的第三方内容如图标和广告，这些问题都可以由 iframe 来解决。
>
> ## 缺点：
>
> 会产生很多页面，不容易管理；
>
> - iframe 框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，降低用户体验度；
> - 代码复杂，无法被一些搜索引擎所引导（这一点很关键，现在的搜索引擎爬虫还不能很好的处理 iframe 中的内容，所以使用 iframe 会不利于搜索引擎优化）；
> - 很多移动设备无法完全显示框架，设备兼容性差；
> - iframe 里面的样式、脚本资源，会增加请求次数，对大型网站是不可取的；
> - iframe 会阻碍页面的 onload 事件，给用户一种页面加载很慢的感觉。

## Google Chrome 如何支持大小小于 12px 的文字?

> - zoom： 非标属性，有兼容问题，缩放会改变了元素占据的空间大小，触发重排
> - -webkit-transform: scale()： 大部分现代浏览器支持，并且对英文、数字、中文也能够生效，缩放不会改变了元素占据的空间大小，页面布局不会发生变化
> - -webkit-text-size-adjust: none： 对谷歌浏览器有版本要求，在 27 之后，就取消了该属性的支持，并且只对英文、数字生效

## 描述一下 CSS 盒子模型

## HTML5 的特性有哪些?

> - 语义化标签，例如 header，footer，section，article 等 语义化标签的作用：提升页面的阅读性(结构性增强)，更有利于 SEO，对于使用屏幕阅读器的人来说会更友好(有明显的语气差别，例如 strong 标签内的内容会重读)；
> - 新增媒体元素，audio、video audio 和 video 标签能够很容易的输出音频或视频流，提供便利的获取文件信息的 API  
>   [MDN video](https://developer.mozilla.org/zh-CN/docs/web/html/element/video)  
>   [MDN audio ](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
> - 用于绘画的 canvas 属性 Canvas API 提供了一个通过 JavaScript 和 HTML 的 canvas 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。[MDN Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
> - 新增本地存储方式：sessionStorage、localStorage  
>   sessionStorage 用于存储会话级别的数据，会话关闭，数据消失，不可设置过期时间。[MDN sessionStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)  
>   localStorage 用于存储需要进行持久化存储的数据，只要不主动删除，数据不会消失。[MDN localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
> - 新的技术：webworker、websocket  
>   webworker：用于多线程编程 [MDN Web Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)
>   websocket：客户端与服务端双向数据通信协议 [MDN WebSocket API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
>   新增的表单控件：calendar、date、time、email、url、search 更多详细属性参考 [MDN input](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

## CSS3 的特性有哪些?

> - CSS3 选择器
> - CSS3 边框与圆角
> - CSS3 背景与渐变
> - CSS3 过渡
> - CSS3 变换
> - CSS3 动画

## 如何实现水平居中?

## 如何实现垂直居中?

## 如何实现双圣杯布局?

## CSS 中选择器的优先级?

## CSS 权重如何计算?

## HTML5 input 元素 type 属性有哪些?

## CSS 中哪些属性可继承，哪些不可以

> ## 能继承的属性
>
> - 字体系列属性:font、font-family、font-weight、font-size、font-style;
> - 内联元素：color、line-height、word-spacing、letter-spacing、text-transform;
> - 块级元素：text-indent、text-align;
> - 元素可见性：visibility
> - 表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout;
> - 列表布局属性：list-style
>
> ## 不能继承的属性
>
> - display：规定元素应该生成的框的类型；
> - 文本属性：vertical-align、text-decoration;
> - 盒子模型的属性：width、height、margin 、border、padding;
> - 背景属性：background、background-color、background-image;
> - 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip;
>
> ## 总结
>
> 字体、文本相关的属性通常可继承
> 布局、盒模型相关的属性通常不可继承
> 继承的属性使子元素可以从父元素继承样式,不继承的属性需要给每个元素单独设置样式

## CSS 单位中 px、em 和 rem 的区别? 配合 font-size 如何计算?(移动端适配方案)

> - `px`：绝对单位，代表屏幕中每个「点」( pixel )。
> - `em`：相对单位，每个子元素通过「倍数」乘以父元素的 px 值。
> - `rem`：相对单位，每个元素通过「倍数」乘以根元素的 px 值。
> - `%`：相对单位，每个子元素通过「百分比」乘以父元素的 px 值。

## 如何画—条 0.5px 的线

> - `scale`
>
> ```css
>  {
>   height: 1px;
>   transform: scaleY(0.5);
>   transform-origin: 50% 100%;
> }
> ```
>
> - `linear-gradient`
>
> ```css
>  {
>   height: 1px;
>   background: linear-gradient(0deg, #fff, #000);
> }
> ```
>
> - `box-shadow`
>
> ```css
>  {
>   height: 1px;
>   background: none;
>   box-shadow: 0 0.5px 0 #000;
> }
> ```
>
> - `viewport`
>
> ```html
> <meta name="viewport" content="width=device-width,initial-sacle=0.5" />
> ```

## 隐藏一个元素有哪些方法? display: none 与 visibility: hidden 与 opacity: 0 之间的区别?

> - `display: none`  
>   元素在页面上将彻底消失，元素本来占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘，并且不会触发它的点击事件。  
>   引起页面回流与重绘，性能消耗大。
> - `visibility: hidden`  
>   元素在页面消失后，其占据的空间依旧会保留着，所以它只会导致浏览器重绘而不会重排，也无法触发它的点击事件  
>   只造成本元素的重绘，性能消耗较少
> - `opacity: 0`  
>   将元素的透明度设置为 0 后，也可以视为一种隐藏，这算是一种隐藏元素的方法。和 visibility: hidden 的一个共同点是元素隐藏后依旧占据着空间，但我们都知道，设置透明度为 0 后，元素只是隐身了，它依旧存在页面中，所以依然可以触发点击事件。  
>   只造成本元素重绘，性能消耗较少
> - `position:absolute`  
>   通过定位将元素定到远离页面的位置，脱标
> - `z-index`  
>   z-index: -1000 通过设置 z-index 值使其它元素遮盖该元素
> - `transform`  
>   transform: scale(0, 0)

## position 的值有哪些，分别有什么特点?

> - `absolute`  
>   生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
> - `fixed`  
>   生成绝对定位的元素，相对于浏览器窗口进行定位。 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
> - `relative`  
>   生成相对定位的元素，相对于其正常位置进行定位。 因此，"left:20" 会向元素的 left 位置添加 20 像素。
> - `sticky`  
>   CSS3 新增，粘性定位，相对于最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden, scroll, auto 或 overlay 时，即不是 visible 时）。 它的行为就像 position:relative 而当页面滚动超出目标区域时，它的表现就像 position:fixed，它会固定在目标位置。
> - `static`  
>   默认值。没有定位，元素出现在正常的流中 （忽略 left、top、right、bottom 或者 z-index 声明）。
> - `inherit`  
>   规定应该从父元素继承 position 属性的值。

## 什么是浮动，浮动会引起什么问题，有何解决方案?

## `line-height` 和 `height` 的区别

> `height`：指定区域的高度
> `line-height`：一行的高度，简称行高。

## 设置一个元素的背景颜色，背景颜色会填充哪些区域?

> 元素的内容、内边距和边框区域

## inline-block、inline 和 block 的区别

## 为什么 img 是 inline 还可以设置宽高

> 浏览器根据元素标签和属性决定显示的内容。  
> 替换元素本身没有内容，是空元素。  
> 替换元素有内在尺寸，width 和 height 属性有效。  
> 替换元素的 margin 和 padding 属性有效。  
> 常见的替换元素：`img`、`input`、`textarea`、`select`

## 什么是重绘?什么是回流?如何减少?

> 浏览器的渲染原理：
>
> - 解析 HTML，生成 DOM 树，解析 CSS，生成 CSSOM 树
> - 将 DOM 树和 CSSOM 树结合，生成渲染树（Render Tree）
>
> **回流**，就是 Render Tree 的部分或全部因元素的规模尺寸、布局、隐藏等改变，从而导致需要重新计算，重新渲染树（页面需要重新渲染）。
>
> 总结：回流就是因为页面布局和几何属性改变时，页面需要重新排布和渲染。  
> 回流是影响浏览器性能的关键因素，因为其变化涉及到部分页面（或是整个页面）的布局更新。一个元素的回流可能会导致了其所有子元素以及 DOM 中紧随其后的节点、祖先节点元素的随后的回流。
>
> **重绘**是当 Render Tree 中的一些元素需要更新属性，但这些属性只会影响元素的外观、风格，不会影响到其布局的页面渲染，这种不会影响到页面布局的页面渲染称为页面重绘。  
> **注：回流必将引起重绘，而重绘不一定会引起回流。**
>
> ### 回流
>
> - 添加了或删除了可见的 DOM 元素
> - 通过 style 控制元素的位置变化
> - 元素尺寸的改变，包括外边距、内边框、边框大小、高度和宽度等
> - 内容改变引发的尺寸改变，例：文本改变或图片大小改变而引起的计算值宽度和高度改变
> - 浏览器窗口尺寸改变，resize 事件的触发
>
> 以下情况会发生重绘：  
> 改一下 background-color，或者改动一下字体颜色的 color 等，或改动：outline, visibility 等

## 如何让文档脱离文档流?

> - float
> - position: absolute
> - position: fixed

## `box-sizing` 的作用，如何使用?

> - content-box：标准盒模型，默认值
> - border-box：怪异盒模型

## 如何实现清除浮动

> - 添加新的元素对其应用 clear: both
> - 父级定义 overflow: hidden
> - 父级定义 overflow: auto

## css 动画如何实现

## 如何实现在某个容器中居中的?

## 如何改变一个 DOM 元素的字体颜色?

## 相对布局和绝对布局，position:relative 和 absolute

> relative:生成相对定位的元素，相对于其正常位置进行定位
> absolute:生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位

## 什么是弹性盒子 flex 布局?

> Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。
> 一个 flexbox 一次只能处理一个维度上的元素布局，一行或者一列。作为对比的是另外一个二维布局 CSS Grid Layout，可以同时处理行和列上的布局。

## 什么是 rem 布局?

> rem 值是相对于根 html 元素而不是父元素的。换句话说，它允许你以相对方式指定字体大小，而不受到父元素大小的影响，从而消除了复合问题。

## less 和 scss 有什么区别?

## ::before 和:after 中双冒号和单冒号的区别?

## CSS3 新增伪类，以及伪元素?

> - 伪类是选择器的一种，它用于选择处于特定状态的元素，比如当它们是这一类型的第一个元素时，或者是当鼠标指针悬浮在元素上面的时候。它们表现得会像是你向你的文档的某个部分应用了一个类一样，帮你在你的标记文本中减少多余的类，让你的代码更灵活、更易于维护。
> - 伪元素以类似方式表现，不过表现得是像你往标记文本中加入全新的 HTML 元素一样，而不是向现有的元素上应用类。伪元素开头为双冒号 `::`。

## 响应式布局实现方案?

> - 媒体查询: @media
> - 百分比布局
> - em/rem 布局
> - 视口单位: vw、vh、vmin、vmax
> - 图片响应式

## link 标签和 import 标签的区别?

> - 从属关系：link 是 html 的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等；而@import 是 css 的语法，只有导入样式表的作用。
> - 加载顺序：页面被加载时，link 会和 html 同时被加载而；@import 引入的 CSS 将在页面加载完毕后被加载。
> - 兼容性：@import 是 CSS2.1 才有的语法，所以只能在 IE5 以上 才能识别；而 link 是 HTML 标签，所以不存在兼容性问题。
> - DOM：javascript 只能控制 dom 去改变 link 标签引入的样式，而@import 的样式不是 dom 可以控制的。
> - link 方式的样式权重高于@import 的权重。

## transition 和 animation 的区别?

> 他们虽然都可以做出动画效果，但是 transition 主要做简单的过渡效果，而 animation 可以做复杂的动画效果，在语法和用法上有非常大的区别。  
> transition 是过渡属性，强调过渡，他的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画，过渡只有一组（两个：开始-结束）关键帧。  
> animation 是动画属性，他的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画（设置多个关键帧）。

## 行内元素，块级元素，行内块元素，置换元素，非置换元素

> ## 行内元素
>
> **特点**: 行内元素默认宽度是由内容撑开的，不能设置宽高，只能容纳文本或者其它行内元素，可以和其他元素在一行拼接显示  
> **常用行内元素**: `a`、`span`、`i`、`em`、`strong`、`img`
>
> ## 块级元素
>
> **特点**: 块级元素默认的宽是容器的 100%，可以设置宽和高，可以容纳其它块级元素或行内元素，并且独占一行。  
> **常用行内元素**: `div`、`h1~h6`、`p`、`ul`、`ol`、`li`、`table`、`form`
>
> ## 行内块元素
>
> **特点**: 行内块元素默认的大小取决于它包容的内容的大小，可以设置宽和高，可以容纳其它元素，不会独占一行。  
> **常用行内块元素**: `input`、`button`、`label`、`select`
>
> ## 置换元素
>
> 置换元素是指其内容不受 CSS 控制，它们的内容通常是由浏览器根据元素的属性和上下文确定的。例如，`img`、`input`、`textarea`等元素，它们的内容并不是在 CSS 的盒模型中呈现的，而是由浏览器根据元素的属性和上下文进行渲染的。在某些情况下，置换元素的尺寸和位置可以受到 CSS 的控制，例如通过设置宽度和高度属性来控制 img 元素的大小。
>
> ## 非置换元素
>
> 非置换元素则是指其内容受 CSS 控制，它们的内容会在 CSS 的盒模型中呈现。例如，`div`、`p`、`span`等元素，它们的内容会受到 CSS 的尺寸、位置、边框等属性的控制，呈现为一个矩形盒子。

## 多行元素的文本省略号如何实现?

> ```css
>  {
>   width: 100%;
>   display: -webkit-box;
>   -webkit-box-orient: vertical;
>   -webkit-line-clamp: 3;
>   overflow: hidden;
> }
> ```

## Doctype 作用?严格模式与混杂模式如何区分?它们有何意义?
