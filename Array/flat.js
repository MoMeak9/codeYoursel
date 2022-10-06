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
