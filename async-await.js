import fetch from "node-fetch";

const loadData = async () => {
    const joke1 = await getDataFromAPI1();
    const joke2 = await getDataFromAPI2();
    return {a: joke1, b: joke2}
}

const getDataFromAPI1 = async () => {
    const uri = 'https://api.chucknorris.io/jokes/random';
    const response = await fetch(uri);
    const responseJSON = await response.json();
    const joke = responseJSON.value;
    return joke;
}

const getDataFromAPI2 = async () => {
    const uri = 'https://api.chucknorris.io/jokes/random';
    const response = await fetch(uri);
    const responseJSON = await response.json();
    const joke = responseJSON.value;
    return joke;
}

const result = await loadData();
console.log(result);
