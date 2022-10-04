function getType(value) {
    if (value == null) {
        return value + '';
    }
    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value); // [Object Array]
        return valueClass.split(" ")[1].split("]")[0];
    } else {
        // 判断数据是基本数据类型的情况和函数的情况
        return typeof value;
    }
}

console.log(getType([]))
