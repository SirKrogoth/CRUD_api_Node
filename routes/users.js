const { response } = require('express');
var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const userSchema = require('../models/userSchema');
const userController = require('../controllers/userController');

//Retorna todos os usuários
router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

//inserindo dados na base
router.post('/', validationMiddleware, userController.insertUser);

function validationMiddleware(req, res, next){
  const { error } = userSchema.validate(req.body);//Pegando o elemento complexo, e capturando apenas os seus erros e colocando em uma constante

  if(error)
    return res.status(422).json({error: error.details});
  else
    next();
}

router.put('/:id', validationMiddleware, userController.updateUser);

router.patch('/:id', userController.patchUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;