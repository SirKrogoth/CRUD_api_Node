const {v4} = require("uuid");
global.users = [];

function findUser(id){
    return global.users.find(item => item.id === id);
}

function findUsers(){
    return global.users;
}

function insertUser(user){
    user.id = v4();
    global.users.push(user);//inserir um dado no final do meu array
    return user;
}

function updateUser(id, user){
    return global.users.forEach((item, index, array) => {
        if(item.id === id){
            user.id = id;
            array[index] = user;
        }
    });
}

function deleteUser(id){
    return global.users.forEach((item, index, array) => {
        if(item.id === id){
            array.splice(index, 1);//remove elemento de array, o valor 1 é a quantidade de dados que serão removidos após este
        }
    });
}

module.exports = {
    findUser, findUsers, insertUser, updateUser, deleteUser
}