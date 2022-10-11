function flat(arr, depth) {
    if (!Array.isArray(arr) || depth <= 0) {
        return arr;
    }
    return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            return prev.concat(flat(cur, depth - 1))
        } else {
            return prev.concat(cur);
        }
    }, []);
}

Array.prototype._flat = function (depth) {
    if (!Array.isArray(this) || depth <= 0) {
        return this;
    }
    return this.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            return prev.concat(cur._flat(depth - 1))
        } else {
            return prev.concat(cur);
        }
    }, []);
}
