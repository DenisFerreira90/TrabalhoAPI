const express = require('express');
const login_router = require ('./router/login_router')
const livros_router = require ('./router/livros_router');
const acesso_middleware = require ('./middleware/acesso_middleware')

const app = express()
const port = 3001

app.use(express.json());

app.use((req, res, next) => {
  console.log('Metodo '+ req.method);
  next();
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.use('/router', login_router);

app.use(acesso_middleware.verificaAcesso);

app.use('./router', livros_router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
