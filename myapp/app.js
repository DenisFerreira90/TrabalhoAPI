const express = require('express');
const app = express();
const port = 3001; // Use um número de porta disponível


// Importe os módulos de serviço e repositório
const livroService = require('./services/livroService');
const livroRepository = require('./repository/livroRepository');

app.use(express.json());

// Rota para listar todos os livros
app.get('/livros', (req, res) => {
  const livros = livroService.listarLivros(livroRepository);
  res.json(livros);
});

// Rota para obter um livro por ID
app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livroService.obterLivroPorId(id, livroRepository);
  if (livro) {
    res.json({
      message: `Livro encontrado com sucesso! 📚`,
      livro: livro
    });
  } else {
    res.status(404).json({
      message: 'Livro não encontrado. 😔'
    });
  }
});


// Rota para criar um novo livro
app.post('/livros', (req, res) => {
  const { title, author } = req.body;
  const novoLivro = livroService.criarLivro(title, author, livroRepository);
  res.status(201).json(novoLivro);
});

// Rota para atualizar um livro por ID
app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const livro = livroService.atualizarLivro(id, title, author, livroRepository);
  if (livro) {
    res.json(livro);
  } else {
    res.status(404).send('Livro não encontrado.');
  }
});

// Rota para excluir um livro por ID
app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const result = livroService.excluirLivro(id, livroRepository);
  if (result) {
    res.send('Livro excluído com sucesso.');
  } else {
    res.status(404).send('Livro não encontrado.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
