class Promise1 {
    constructor(handler) {
        this.status = "pending";
        this.value = null;
      
        const resolve = (value) => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
            }
        };
        const reject = (value) => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = value;
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
        if (this.status === "fulfilled") {
            onFulfilled(this.value);
        } else if (this.status === "rejected") {
            onRejected(this.value);
        }
    }
}

// testing code
const p1 = new Promise1((resolve, reject) => {
    console.log('resolve');
    resolve('resolved!');
});
const p2 = new Promise1((resolve, reject) => {
    console.log('reject');
    reject('rejected!')
})
p1.then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});
p2.then((res) => {
    console.log(res);
}, (err) => {
    console.log('p2 err',err);
});