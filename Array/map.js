Array.prototype._map = function(fn) {
    if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const res = [];
    // len 不受数组改变而改变
    for (let i = 0, len = this.length; i < len; i++) {
        res.push(fn(this[i]));
    }
    return res;
}
const arr = [1]
console.log(arr._map((item)=>{
    arr.push(2)
    return item
}))
console.log(arr)
