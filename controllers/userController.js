const db = require("../models/userModel");
const _usersJsonCaminho = "../data/users.json";

function getUsers(_req, _res, next) {
    return _res.json(db.findUsers());
}

function getUserById(_req, _res){
    const id = _req.params.id;
    return _res.json(db.findUser(id));
}

function insertUser(req, res){
    db.insertUser(req.body);
    return res.status(201).json(require(_usersJsonCaminho));//retorna no json o user
}

function updateUser(req, res){
    const id = req.params.id;
    db.updateUser(id, req.body);
    return res.status(200).json(require(_usersJsonCaminho))
}

function patchUser(req, res){
    const id = req.params.id;
    const user = db.updateUser(id, req.body, false);
    return res.status(200).json(user);
}

function deleteUser(req, res){
    const id = req.params.id;
    db.deleteUser(id);
  
    return res.status(200);
}

module.exports = {
    getUsers,
    getUserById,
    insertUser,
    updateUser,
    patchUser,
    deleteUser
}