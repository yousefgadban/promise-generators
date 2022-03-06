class Promise {
    constructor(handler) {
        this.status = "pending";
        this.name = Date.now();
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            console.log('res1', this.name, value, this.onFulfilledCallbacks.length);
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn(value));
            }
        };

        const reject = value => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = value;
                this.onRejectedCallbacks.forEach(fn => fn(value));
            }
        };

        try {
            console.log('handler');
            handler(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        console.log('th ', this.name, this.status);
        return new Promise((resolve, reject) => {
            if (this.status === "pending") {
                this.onFulfilledCallbacks.push(() => {
                    console.log('th1');
                    try {
                        const fulfilledFromLastPromise = onFulfilled(this.value);
                        resolve(fulfilledFromLastPromise);
                    } catch (err) {
                        reject(err);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const rejectedFromLastPromise = onRejected(this.value);
                        reject(rejectedFromLastPromise);
                    } catch (err) {
                        reject(err);
                    }
                });
            }
    
            if (this.status === "fulfilled") {
                console.log('fulfilled ', this.name, this.status);
                try {
                    const fulfilledFromLastPromise = onFulfilled(this.value);
                    resolve(fulfilledFromLastPromise);
                } catch (err) {
                    reject(err);
                }
            }
    
            if (this.status === "rejected") {
                try {
                    const rejectedFromLastPromise = onRejected(this.value);
                    reject(rejectedFromLastPromise);
                } catch (err) {
                    reject(err);
                }
            }
        });
    }
}


// const p3 = new Promise((resolve, reject) => {
//     console.log('promise');
//     setTimeout(() => resolve('resolved!'), 2000);
// });
// p3.then((res) => {
//     console.log('then');
//     console.log(res);
// }, (err) => {
//     console.log(err);
// });


const p3 = new Promise((resolve, reject) => {
    console.log('promise');
    setTimeout(() => resolve('resolved!'), 4000);
});
p3.then((res) => {
    console.log('then');
    console.log(res);
    return res + ' do some calculation';
}).then(res => {
    console.log('thenn');
    console.log(res);
});

// const p = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('resolved first one'), 1000);
// });
// p.then((res) => {
//     console.log(res);
//     return res + ' do some calculation';
// }).then(res => {
//     console.log(res);
// });