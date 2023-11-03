const jwt = require('jsonwebtoken')

const usuario = {
    id:40,
    name: "Denis",
    username: "MediCaster",
    senha: "280417"

}

const jwtSecret = 'sen@c2023_2';

function validarLogin(login){
    if (login && login.username && login.senha) {
        if(login.username == usuario.username && login.senha == usuario.senha) {
            const token = jwt.sign({usuario:usuario.id},jwtSecret,{expresIn: '1h'});   
        return token;
         }
    }
    throw {id: 401, message: "Username ou Senha Invalidos!"};
}

function validarToken(token){
    try {
        const payload = jwt.verify(token, jwtSecret);
        if (payload){
            console.log(payload.usuario);
            return (payload);
        
        }
        else {
            throw {id: 401, message:"Voce nao tem acesso ao recurso"};
        }
    } catch(error){
            throw {id: 401, message: "Voce nao tem acesso ao recurso"};
        }
    }
    module.exports = {validarLogin, validarToken}