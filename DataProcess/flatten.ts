let arr = [1, [2, [3, 4]]];

function flatten(arr: any[]): any[] {
    return arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flatten(cur) : cur), [])
}

console.log(flatten(arr));//  [1, 2, 3, 4，5]
