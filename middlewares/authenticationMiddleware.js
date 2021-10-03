/**
 * Tipos de autenticação
 * - API Key
 * Gera uma chave para acesso de uma API terceira
 * Utilizado para integração Sistema -> Sistema
 * - Token
 * Prazo de validade mais curto, revoga a cada sessao
 * - Pesquisar outros
 */
const keyModel = require('../models/keyModel');

module.exports = function(req, res, next){
    const key = req.headers['authorization'];
    const apikey = keyModel.findKey(key.replace('ApiKey', ''));

    if(apikey && apikey.enabled)
        return next();
    else
        res.sendStatus(401);
}