import fetch from "node-fetch";

const loadData = () => {
    return new Promise((resolve, reject) => {
        getDataFromAPI1().then((joke1) => {
            getDataFromAPI2().then((joke2) => {
                resolve({a: joke1, b: joke2});
            }).catch((err) => {
                reject(err);
            });
        })
    })
}

const getDataFromAPI1 = () => {
    const uri = 'https://api.chucknorris.io/jokes/random';
    return new Promise((resolve, reject) => {
        fetch(uri).then((response) => {
            response.json().then((responseJSON) => {
                const joke = responseJSON.value;
                resolve(joke);
            }).catch((err) => {
                reject(err);
            });
        })
    })
}

const getDataFromAPI2 = () => {
    const uri = 'https://api.chucknorris.io/jokes/random';
    return new Promise((resolve, reject) => {
        fetch(uri).then((response) => {
            response.json().then((responseJSON) => {
                const joke = responseJSON.value;
                resolve(joke);
            }).catch((err) => {
                reject(err);
            });
        })
    })
}

loadData().then((result) => {
    console.log(result);
})
