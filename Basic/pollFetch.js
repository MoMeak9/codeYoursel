// 通用方法
const timeoutPromise = (delayTime) => {
    return new Promise(resolve => {
        setTimeout(resolve, delayTime);
    })
}

// 装逼写法
const pollFetch = (url, options, delayTime, maxTimes) => {
    return new Promise((resolve, reject) => {
        let times = 0;
        const fetchFunc = () => {
            fetch(url, options).then(response => {
                if (response.ok) {
                    resolve(response);
                } else {
                    if (times < maxTimes) {
                        times++;
                        timeoutPromise(delayTime).then(fetchFunc);
                    } else {
                        reject(response);
                    }
                }
            }).catch(error => {
                if (times < maxTimes) {
                    times++;
                    timeoutPromise(delayTime).then(fetchFunc);
                } else {
                    reject(error);
                }
            });
        };
        fetchFunc();
    });
}

// 简单版本
const syncPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 50);
    })
}

const pollFetch2 = async () => {
    while (true) {
        const delayTime = 60 * 1000;
        try {
            await syncPromise();
        } catch (e) {
            console.log(e);
        } finally {
            await timeoutPromise(delayTime);
        }
    }
}

pollFetch2().then();
