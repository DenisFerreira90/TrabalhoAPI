const express = require('express');
const app = express();
const port = 3001;

const livroService = require('./services/livroService');
const livroRepository = require('./repository/livroRepository');

app.use(express.json());

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).json({ msg: err.message });
  } else if (err.status === 404) {
    res.status(404).json({ msg: err.message });
  } else {
    next(err);
  }
});

app.get('/livros', (req, res) => {
  const livros = livroService.listarLivros(livroRepository);
  res.json(livros);
});

app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livroService.obterLivroPorId(id, livroRepository);
  if (livro) {
    res.json({
      message: 'Livro encontrado com sucesso! 📚',
      livro: livro
    });
  } else {
    res.status(404).json({
      message: 'Livro não encontrado. 😔'
    });
  }
});

app.post('/livros', (req, res) => {
  const { title, author } = req.body;
  const novoLivro = livroService.criarLivro(title, author, livroRepository);
  res.status(201).json({ message: 'Livro criado com sucesso!', livro: novoLivro });
});

function atualizar(req, res) {
  const id = +req.params.id;
  const { title, author } = req.body;
  try {
    livroRepository.atualizarLivro(id, title, author);
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const result = livroService.excluirLivro(id, livroRepository);
  if (result) {
    res.send('Livro excluído com sucesso.');
  } else {
    res.status(404).json({ message: 'Livro não encontrado.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
