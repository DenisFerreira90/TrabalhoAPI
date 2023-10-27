const express = require('express');
const app = express();
const port = 3001;

const livroService = require('./services/livroService');
const livroRepository = require('./repository/livroRepository');

const MAX_LIVROS = 10;

const fs = require('fs');

const listaDeLivros = JSON.parse(fs.readFileSync('./livros/livrosReais.json', 'utf8')).livros;

app.use(express.json());

app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).json({ message: err.message });
  } else if (err.status === 404) {
    res.status(404).json({ message: err.message });
  } else if (err.status === 409) {
    res.status(409).json({ message: err.message });
  } else {
    next(err);
  }
});

app.get('/livros', (req, res) => {
  const livros = livroService.listarLivros(livroRepository);

  // Mapear a lista de livros e simplificar a estrutura da resposta
  const livrosSimplificados = livros.map((livro) => ({
    id: livro.id,
    title: livro.title.title.title,
    author: livro.title.title.author,
  }));

  res.json(livrosSimplificados);
});



app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
    return;
  }

  const livro = livroService.obterLivroPorId(id, livroRepository);
  if (livro) {
    res.json({
      message: 'Livro encontrado com sucesso! 📚',
      livro: {
        id: livro.id,
        title: livro.title,
        author: livro.author
      }
    });
  } else {
    res.status(404).json({
      message: 'Livro não encontrado. 😔'
    });
  }
});



app.post('/livros', (req, res) => {
  const { author } = req.body;

  // Verifique se o limite máximo de livros foi atingido
  const livros = livroService.listarLivros(livroRepository);
  if (livros.length >= MAX_LIVROS) {
    res.status(409).json({ message: 'Limite máximo de livros atingido' });
    return;
  }

  // Escolha um nome de livro real aleatório da lista
  const nomeAleatorio = listaDeLivros[Math.floor(Math.random() * listaDeLivros.length)];

  const novoLivro = {
    title: nomeAleatorio,
    author: author
  };

  livroService.criarLivro(novoLivro, livroRepository);
  res.status(201).json({ message: 'Livro criado com sucesso!', livro: novoLivro });
});

app.put('/livros/:id', (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;
  try {
    livroRepository.atualizarLivro(id, title, author);
    res.json({ message: 'Livro atualizado com sucesso' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // Converte o ID para um número inteiro
  const result = livroService.excluirLivro(id, livroRepository);
  if (result) {
    res.send('Livro excluído com sucesso.');
  } else {
    console.log('Livro não encontrado para exclusão. ID:', id);
    res.status(404).json({ message: 'Livro não encontrado.' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
