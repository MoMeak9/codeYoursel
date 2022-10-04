// 函数节流的实现，相当于工厂函数
function throttle(fn, delay) {
    let curTime = Date.now();

    return function() {
        let context = this,
            nowTime = Date.now();

        // 如果两次时间间隔超过了指定时间，则执行函数。
        if (nowTime - curTime >= delay) {
            curTime = Date.now();
            return fn.apply(context, arguments);
        }
    };
}

const throttleFun =  throttle(() => {}, 1000);
const res = throttleFun();
