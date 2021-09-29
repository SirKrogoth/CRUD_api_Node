const {v4} = require("uuid");
const fs = require("fs");
const FILE_PATH = require("path").join(__dirname, "users.json"); //vai concatenar da forma correta. 

function findUser(id){
    return findUsers().find(item => item.id === id);
}

function findUsers(){
    try{
        return require(FILE_PATH);
    }catch(error){
        return []
    }
}

function insertUser(user){
    const users = findUsers();//Cria um array com todos os usuários
    user.id = v4();//insere ID
    users.push(user);//Insere user dentro do array users
    fs.writeFileSync(FILE_PATH, JSON.stringify(users));//metodo syncrono, ou seja, vai esperar o retorno. Escreve no arquivo 
    return user;//retorna user com id
}

function updateUser(id, user){
    const users = findUsers();//Pega todos os usuários e coloca no array
    //Abaixo função responsável por atualizar o indice
    users.forEach((item, index, array) => {
        if(item.id === id){
            user.id = id;
            array[index] = user;
        }
    });

    fs.writeFileSync(FILE_PATH, JSON.stringify(users));//Escreve de modo Sincrono, ou seja, aguarda o retorno
    return user;//retorna user com o id atualizado
}

function deleteUser(id){
    const users = findUsers();//busca todos os usuarios e coloca no array
    //Ira remover os dados
    users.forEach((item, index, array) => {
        if(item.id === id)
            array.splice(index, 1);//remove dado do array, naquele indice, e a quantidade informada
    });

    fs.writeFileSync(FILE_PATH, JSON.stringify(users));//escreve novamente no json

    return id;//retorna id
}

module.exports = {
    findUser, findUsers, insertUser, updateUser, deleteUser
}