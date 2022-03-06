class Promise2 {
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
        console.log('then');
        if (this.status === "pending") {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }

        if (this.status === "fulfilled") {
            onFulfilled(this.value);
        }

        if (this.status === "rejected") {
            onRejected(this.value);
        }
    }
}

// testing code
const p3 = new Promise2((resolve, reject) => {
    console.log('p3');
    setTimeout(() => resolve('resolved!'), 3000);
});
p3.then((res) => {
    console.log('p33');
    console.log(res);
}, (err) => {
    console.log(err);
});