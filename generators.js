import fetch from "node-fetch";

const geterator1 = function *() {
    const uri = 'https://api.chucknorris.io/jokes/random';
    const response = yield fetch(uri);
    const responseData = yield response.json();
    const joke = responseData.value;
    return joke;
}


const geterator2 = function *() {
    const uri = 'https://api.chucknorris.io/jokes/random';
    const response = yield fetch(uri);
    const responseData = yield response.json();
    const joke = responseData.value;
    return joke;
}

function run(generator) {
    const iterator = generator();
    const iteration = iterator.next();

    function iterate(iteration) {
        if (iteration.done) return iteration.value;
        const promise = iteration.value;
        return promise.then(x => iterate(iterator.next(x)))
    }
    return iterate(iteration)
}


const loadData = () => {
    run(geterator1).then((res1) => {
        run(geterator2).then((res2) => {
            console.log({a: res1, b: res2});
            return {a: res1, b: res2};
        })
    }).catch(err => console.log('err', err))
}

loadData()
