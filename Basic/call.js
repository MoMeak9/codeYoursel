Function.prototype.myCall = function (context) {
    // 判断调用对象
    if (typeof this !== "function") {
        console.error("type error");
    }
    // 获取参数
    let args = [...arguments].slice(1),
        result = null;
    // 判断 context 是否传入，如果未传入则设置为 window
    context ??= window;
    // 将调用函数设为此上下文对象的方法，很重要！
    context.fn = this;
    // 调用函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn;
    return result;
}

Array.prototype.splice.myCall([1, 2, 3, 4, 5], 1, 2);
// 此时this 即 splice，context 即 [1, 2, 3, 4, 5]，args 即 [1, 2]
