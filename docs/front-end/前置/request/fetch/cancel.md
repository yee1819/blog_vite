# 取消请求

`fetch()`请求发送以后，如果中途想要取消，需要使用`AbortController`对象。



```javascript
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```

上面示例中，首先新建 AbortController 实例，然后发送`fetch()`请求，配置对象的`signal`属性必须指定接收 AbortController 实例发送的信号`controller.signal`。

`controller.abort()`方法用于发出取消信号。这时会触发`abort`事件，这个事件可以监听，也可以通过`controller.signal.aborted`属性判断取消信号是否已经发出。

下面是一个1秒后自动取消请求的例子。

> ```javascript
> let controller = new AbortController();
> setTimeout(() => controller.abort(), 1000);
> 
> try {
>   let response = await fetch('/long-operation', {
>     signal: controller.signal
>   });
> } catch(err) {
>   if (err.name == 'AbortError') {
>     console.log('Aborted!');
>   } else {
>     throw err;
>   }
> }
> ```