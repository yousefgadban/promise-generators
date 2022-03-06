// version 1
class Promise {
    constructor(handler) {
        this.status = "pending";
        this.value = null;
      
        const resolve = value => {
            console.log('r1');
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
            }
        };
        const reject = value => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = value;
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
        console.log('th');
        if (this.status === "fulfilled") {
            onFulfilled(this.value);
        } else if (this.status === "rejected") {
            onRejected(this.value);
        } else {
            console.log('pending');
        }
    }
}

// testing code
const p1 = new Promise((resolve, reject) => {
    console.log('promise');
   // resolve('resolved!');
    setTimeout(() => resolve('resolved!'), 2000);
});

p1.then((res) => {
    console.log('then');
    console.log(res);
}, (err) => {
    console.log(err);
});


// const p2 = new Promise((resolve, reject) => {
//     reject('rejected!')
// })
// p2.then((res) => {
//     console.log(res);
// }, (err) => {
//     console.log(err);
// });