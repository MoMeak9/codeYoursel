const pending = "pending";
const fulfilled = "fulfilled";
const rejected = "rejected"; // 添加状态 rejected

class MyPromise {
    constructor(run) { // run 函数 (resolve, reject) => any
        this.resolvedCallback = [];
        this.rejectedCallback = []; // 添加一个处理错误的队列
        this.status = pending;
        this.data = void 0; // 保存异步结果
        const resolve = value => {
            if (this.status === pending) {
                this.status = fulfilled;
                this.data = value;
                this.resolvedCallback.forEach(callback => callback(this.data));
            }
        };
        const reject = err => {
            if (this.status === pending) {
                this.status = rejected;
                this.data = err;
                this.rejectedCallback.forEach(callback => callback(this.data));
            }
        };
        try { // 对构造器里传入的函数进行try / catch
            run(resolve, reject); // !!! 核心
        } catch (e) {
            reject(e)
        }
    }

    static resolve(p) {
        if (p instanceof MyPromise) {
            return p.then()
        }
        return new MyPromise((resolve, reject) => {
            resolve(p)
        })
    }

    static reject(p) {
        if (p instanceof MyPromise) {
            return p.catch()
        }
        return new MyPromise((resolve, reject) => {
            reject(p)
        })
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            try {
                let count = 0,
                    len = promises.length,
                    value = [];
                for (let promise of promises) {
                    MyPromise.resolve(promise).then(v => {
                        count++;
                        value.push(v);
                        if (count === len) {
                            resolve(value)
                        }
                    })
                }
            } catch (e) {
                reject(e)
            }
        });
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            try {
                for (let promise of promises) {
                    MyPromise.resolve(promise).then(resolve)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    catch(onRejected) {
        return this.then(void 666, onRejected)
    }

    then(onResolved, onRejected) { // 添加两个监听函数
        // 这里需要对onResolved做一下处理，当onResolved不是函数时将它变成函数
        onResolved = typeof onResolved === "function" ? onResolved : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : err => {
            throw err
        };

        switch (this.status) {
            case pending: {
                return new MyPromise((resolve, reject) => {
                    this.resolvedCallback.push(value => {
                        try { // 对整个onResolved进行try / catch
                            const result = onResolved(value);
                            if (result instanceof MyPromise) {
                                result.then(resolve, reject)
                            } else {
                                resolve(result);
                            }
                        } catch (e) {
                            reject(e)
                        }
                    });
                    this.rejectedCallback.push(err => {
                        try { // 对整个onRejected进行try / catch
                            const result = onRejected(err);
                            if (result instanceof MyPromise) {
                                result.then(resolve, reject)
                            } else {
                                reject(err)
                            }
                        } catch (e) {
                            reject(err)
                        }
                    })
                })
            }
            case fulfilled: {
                return new MyPromise((resolve, reject) => {
                    try { // 对整个过程进行try / catch
                        const result = onResolved(this.data);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result);  // emit
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            case rejected: {
                return new MyPromise((resolve, reject) => {
                    try { // 对整个过程进行try / catch
                        const result = onRejected(this.data);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            reject(result)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        }
    }
}
