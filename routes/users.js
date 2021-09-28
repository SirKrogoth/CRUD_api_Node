const { response } = require('express');
var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const db = require("../db");

//Retorna todos os usuários
router.get('/', function(req, res, next) {
  res.json(db.findUsers());
});

//inserindo dados na base
router.post('/', function(req, res){
  db.insertUser(req.body);
  res.status(201).json(users);//retorna no json o user
});

router.put('/:id', function(req, res){
  const id = req.params.id;
  const user = db.updateUser(id, req.body);
  res.status(200).json(users)
});

router.delete('/:id', function(req, res){
  const id = req.params.id;
  const user = db.deleteUser(id);

  res.status(200).json(users);
})

module.exports = router;