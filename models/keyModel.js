const {v4} = require("uuid");
const fs = require("fs");
const { keys } = require("./userSchema");
const FILE_PATH = require("path").join(__dirname, "keys.json"); //vai concatenar da forma correta. 

function findKeys(){
    if(!fs.existsSync(FILE_PATH)) return [];

    const rawData = fs.readFileSync(FILE_PATH);
    return JSON.parse(rawData);
}

function findKey(key){
    return findKeys().find(k => k.key === key)
}

function createtKey(key){
    const key = findKeys();
    const apiKey = {
        key: v4(),
        enabled: true,
        lastUsed: null
    };

    keys.push(apiKey);
    fs.writeFileSync(FILE_PATH, JSON.stringify(keys));
    return apiKey;
}

function deleteKey(key){
    const keys = findKeys();//busca todos os usuarios e coloca no array
    //Ira remover os dados
    keys.forEach((item, index, array) => {
        if(item.key === key)
            array.splice(index, 1);//remove dado do array, naquele indice, e a quantidade informada
    });

    fs.writeFileSync(FILE_PATH, JSON.stringify(keys));//escreve novamente no json

    return key;//retorna id
}

module.exports = {
    findKey,
    createtKey,
    deleteKey
}