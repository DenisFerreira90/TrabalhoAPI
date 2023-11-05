const login_service = require ('../services/login_service')

function verificaAcesso(req, res, next) {
    const token = req.header('X-Auth-Token');
    try{
        login_service.validarToken(token);
        next();
    }
    catch(err) {
        res.status(err.id).json({msg: err.massage});
    }
}
module.exports = {verificaAcesso}