const states = {
    PENDING : 'pending',
    FULFILLED : 'fulfilled',
    REJECTED : 'rejected'

}

class MyPromise {
    constructor(handler) {
        this.status = states.PENDING;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            if (this.status === states.PENDING) {
                this.status = states.FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn(value));
            }
        };

        const reject = value => {
            if (this.status === states.PENDING) {
                this.status = states.REJECTED ;
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
        return new MyPromise((resolve, reject) => {
            if (this.status === states.PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    if (typeof onFulfilled === 'function') {
                        try {
                            const fulfilledFromLastPromise = onFulfilled(this.value);
                            if (fulfilledFromLastPromise instanceof MyPromise) {
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
                            if (rejectedFromLastPromise instanceof MyPromise) {
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

            if (this.status === states.FULFILLED) {
                try {
                    const fulfilledFromLastPromise = onFulfilled(this.value);
                    if (fulfilledFromLastPromise instanceof MyPromise) {
                        fulfilledFromLastPromise.then(resolve, reject);
                    } else {
                        resolve(fulfilledFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }

            }

            if (this.status === states.REJECTED ) {
                try {
                    const rejectedFromLastPromise = onRejected(this.value);
                    if (rejectedFromLastPromise instanceof MyPromise) {
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
let myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('resolved first 1'), 1000);
});
myPromise.then((res) => {
    console.log(res);
    return new MyPromise((resolve, reject) => {
        setTimeout(() => resolve('resolved second 2'), 1000);
    });
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log('catch', err);
    return err;
});