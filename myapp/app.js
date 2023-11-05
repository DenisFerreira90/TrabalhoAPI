const express = require('express');
<<<<<<< HEAD
const app = express();
const port = 3001;

const livroService = require('./services/livroService');
const livroRepository = require('./repository/livroRepository');
const livroRouter = require('./router/livros.router');
=======
const login_router = require ('./router/login_router')
const livros_router = require ('./router/livros.router');
const acesso_middleware = require ('./middleware/acesso_middleware')
>>>>>>> parent of e71c3bb (att)


app.use(express.json());

app.use((req, res, next) => {
  console.log('metodo'+ req.method);
  next();
})


app.use('./')

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
