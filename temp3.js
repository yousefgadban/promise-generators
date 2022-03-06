const states = {
    PENDING : 'pending',
    FULFILLED : 'fulfilled',
    REJECTED : 'rejected'

}

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
                        if (fulfilledFromLastPromise instanceof Promise) {
                            fulfilledFromLastPromise.then(resolve, reject);
                        } else {
                            resolve(fulfilledFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const rejectedFromLastPromise = onRejected(this.value);
                        if (rejectedFromLastPromise instanceof Promise) {
                            rejectedFromLastPromise.then(resolve, reject);
                        } else {
                            reject(rejectedFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            }
    
            if (this.status === "fulfilled") {
                try {
                    const fulfilledFromLastPromise = onFulfilled(this.value);
                    if (fulfilledFromLastPromise instanceof Promise) {
                        fulfilledFromLastPromise.then(resolve, reject);
                    } else {
                        resolve(fulfilledFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }
    
            }
    
            if (this.status === "rejected") {
                try {
                    const rejectedFromLastPromise = onRejected(this.value);
                    if (rejectedFromLastPromise instanceof Promise) {
                        rejectedFromLastPromise.then(resolve, reject);
                    } else {
                        reject(rejectedFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }
            }
        });
    }
}

const p1 = new Promise((resolve, reject) => {
    console.log('promise');
    setTimeout(() => resolve('resolved first one'), 4000);
})

p1.then((res) => {
    console.log('then');
    console.log(res);
    return new Promise(resolve => {
        setTimeout(() => resolve('resolved second one'), 4000);
    });
}).then(res => {
    console.log('thenn');
    console.log(res);
});