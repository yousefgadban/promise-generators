class Promise {
    constructor(handler) {
        this.status = "pending";
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            console.log('res1',  this.onFulfilledCallbacks.length);
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
       
        if (this.status === "pending") {
            console.log('th1');
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }

        if (this.status === "fulfilled") {
            onFulfilled(this.value);
        }

        if (this.status === "rejected") {
            onRejected(this.value);
        }
        console.log('th2');
    }
}

// testing code
const p3 = new Promise((resolve, reject) => {
    console.log('promise');
    setTimeout(() => resolve('resolved!'), 2000);
});
p3.then((res) => {
    console.log('then');
    console.log(res);
}, (err) => {
    console.log(err);
});


// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('resolved first one'), 1000);
// })

// p1.then((res) => {
//     console.log(res);
//     return new Promise(resolve => {
//         setTimeout(() => resolve('resolved second one'), 1000);
//     });
// }).then(res => {
//     console.log(res);
// });