const express = require('express');
const app = express();
const port = 3001;

const livroService = require('./services/livroService');
const livroRepository = require('./repository/livroRepository');

app.use(express.json());

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.status + ' - ' + err.message });
  } else {
    next(err);
  }
});

app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livroService.obterLivroPorId(id, livroRepository);
  if (livro) {
    res.json({
      message: '200 OK - Livro encontrado com sucesso! 📚',
      livro: livro
    });
  } else {
    res.status(404).json({
      message: '404 NOT FOUND - Livro não encontrado. 😔'
    });
  }
});

app.post('/livros', (req, res) => {
  const { title, author } = req.body;
  const novoLivro = livroService.criarLivro(title, author, livroRepository);
  res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
  const id = +req.params.id;
  const livro = req.body;

  try {
    livroRepository.atualizarLivro(id, livro);
    res.json({ message: '200 OK - Livro atualizado com sucesso' });
  } catch (err) {
    res.status(400).json({ message: '400 BAD REQUEST - ' + err.message });
  }
});

app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const result = livroService.excluirLivro(id, livroRepository);
  if (result) {
    res.send('200 OK - Livro excluído com sucesso.');
  } else {
    res.status(404).send('404 NOT FOUND - Livro não encontrado.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});