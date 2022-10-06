Function.prototype.myBind = function (context) {
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    const args = [...arguments].slice(1)
    return function Fn() {
        // 根据调用方式，传入不同绑定值，判断函数作为构造函数的情况
        return this.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}
