// Object 相关手撕

// 1. 实现一个 Object.creat 操作符
function creat(obj) {
    function F() {
    }

    F.prototype = obj
    return new F()
}

// 2. 实现一个 Object.assign 操作符
function assign(target, ...sources) {
    sources.forEach(source => {
        for (let key in source) { // 可枚举的属性
            if (source.hasOwnProperty(key)) { // 自己的属性，而不是原型链上的
                target[key] = source[key]
            }
        }
    })
    return target
}

// 3. 实现一个 Object.is 操作符
function is(x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y // +0 -0
    }
    return x !== x && y !== y // NaN
}

// 4. 实现一个 instanceof 操作符
function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left)
    while (true) {
        if (proto === null) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

// 5. 实现一个 new 操作符
function myNew() {
    let obj = {}
    let Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    let ret = Constructor.apply(obj, arguments) // 执行构造函数，将构造函数的this指向obj
    // 判断返回对象类型，如果是object或者function，就返回这个对象，否则返回obj（this）
    return typeof ret === 'object' ? ret : obj
}
