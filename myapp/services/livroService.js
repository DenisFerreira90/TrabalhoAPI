// livroService.js

// Importe o repositório
const livroRepository = require('../repository/livroRepository');

// Limite máximo de livros
const MAX_LIVROS = 10;

// Função para listar todos os livros
function listarLivros() {
  return livroRepository.listarLivros();
}

function obterLivroPorId(id) {
  return livroRepository.obterLivroPorId(id);
}

// Função para gerar um novo ID
function gerarNovoID() {
  const livros = livroRepository.listarLivros();
  if (livros.length === 0) {
    return 1; // Se não houver livros, comece com o ID 1
  }
  const ultimoLivro = livros[livros.length - 1];
  return ultimoLivro.id + 1; // ID único é um a mais que o último ID
}

// Função para criar um novo livro
function criarLivro(title, author) {
  const livros = livroRepository.listarLivros();

  if (livros.length >= MAX_LIVROS) {
    throw { id: 410, message: 'Limite máximo de livros atingido' };
  }

  try {
    const livro = livroRepository.criarLivro(title, author);
    return { message: 'Livro criado com sucesso', livro };
  } catch (err) {
    return { status: err.id, message: `Livro não foi criado - ${err.message}` };
  }
}

// Função para atualizar um livro por ID
function atualizarLivro(id, livroAtualizado) {
  try {
    const livro = obterLivroPorId(id);
    if (livro) {
      livro.title = livroAtualizado.title;
      livro.author = livroAtualizado.author;
      return livro;
    } else {
      throw { id: 404, message: 'Produto não encontrado' };
    }
  } catch (err) {
    if (err.id === 404) {
      throw { status: 404, message: err.message };
    } else {
      throw { status: 400, message: err.message };
    }
  }
}

// Função para verificar se já existe um livro com o mesmo ID
function existeLivroComID(id) {
  const livroExistente = livroRepository.obterLivroPorId(id);
  return livroExistente !== null;
}

// Função para excluir um livro por ID
function excluirLivro(id) {
  const sucesso = livroRepository.excluirLivro(id);
  if (sucesso) {
    return `Livro com ID ${id} excluído com sucesso.`;
  } else {
    throw { id: 404, message: 'Livro não encontrado' };
  }
}


module.exports = {
  listarLivros,
  obterLivroPorId,
  criarLivro,
  atualizarLivro,
  excluirLivro,
  existeLivroComID,
  gerarNovoID
};
