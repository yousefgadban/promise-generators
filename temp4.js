class Promise {
    constructor(handler) {
        this.status = "pending";
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
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
            handler(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
            if (this.status === "pending") {
                this.onFulfilledCallbacks.push(() => {
                    if (typeof onFulfilled === 'function') {
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
                    } else {
                        reject(this.value);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    if (typeof onRejected === 'function') {
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
                    } else {
                        return reject(this.value);
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

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
}

// testing code
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('resolved first 1'), 1000);
});
p1.then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('resolved second 2'), 1000);
    });
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log('catch', err);
    return err;
});