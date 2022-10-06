function uniqueArray(arr) {
    return Array.from(new Set(arr))
}

function uniqueArray2(array) {
    let map = {};
    let res = [];
    for (let i = 0; i < array.length; i++) {
        if (!map[array[i]]) {
            map[array[i]] = 1;
            res.push(array[i]);
        }
    }
    return res;
}
