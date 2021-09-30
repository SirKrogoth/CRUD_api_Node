const { response } = require('express');
var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const db = require("../models/db");
const _usersJsonCaminho = "../models/users.json";
const userSchema = require('../models/userSchema');

//Retorna todos os usuários
router.get('/', function(_req, _res, next) {
  _res.json(db.findUsers());
});

router.get('/:id', function(_req, _res){
  const id = _req.params.id;
  _res.json(db.findUser(id))
});

//inserindo dados na base
router.post('/', validationMiddleware, function(req, res){
  db.insertUser(req.body);
  res.status(201).json(require(_usersJsonCaminho));//retorna no json o user
});

function validationMiddleware(req, res, next){
  const { error } = userSchema.validate(req.body);//Pegando o elemento complexo, e capturando apenas os seus erros e colocando em uma constante

  if(error)
    return res.status(422).json({error: error.details});
  else
    next();
}

router.put('/:id', validationMiddleware, function(req, res){
  const id = req.params.id;
  db.updateUser(id, req.body);
  res.status(200).json(require(_usersJsonCaminho))
});

router.patch('/:id', function (req, res){
  const id = req.params.id;
  const user = db.updateUser(id, req.body, false);
  res.status(200).json(user);
});

router.delete('/:id', function(req, res){
  const id = req.params.id;
  db.deleteUser(id);

  res.status(200).json(require(_usersJsonCaminho));
})

module.exports = router;