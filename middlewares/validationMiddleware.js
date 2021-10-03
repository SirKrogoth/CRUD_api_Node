const userSchema = require('../models/userSchema');

module.exportes = function validationMiddleware(req, res, next){
    const { error } = userSchema.validate(req.body);//Pegando o elemento complexo, e capturando apenas os seus erros e colocando em uma constante
  
    if(error)
      return res.status(422).json({error: error.details});
    else
      next();
  }