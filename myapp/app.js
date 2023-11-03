const express = require('express');
const login_router = require ('./router/login_router')
const livros_router = require ('./router/livros.router');
const acesso_middleware = require ('./middleware/acesso_middleware')

const app = express()
const port = 3001

app.use(express.json());

app.use((req, res, next) => {
  console.log('metodo'+ req.method);
  next();
})


app.use('./')

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
