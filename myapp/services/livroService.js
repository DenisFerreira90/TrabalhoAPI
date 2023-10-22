// livroService.js

// Importe o repositório
const livroRepository = require('../repository/livroRepository');

// Função para listar todos os livros
function listarLivros() {
  return livroRepository.listarLivros();
}

// Função para obter um livro por ID
function obterLivroPorId(id) {
  return livroRepository.obterLivroPorId(id);
}

// Função para criar um novo livro
function criarLivro(title, author) {
  try {
    const livro = livroRepository.criarLivro(title, author);
    return { message: '201 - Livro criado com sucesso', livro };
  } catch (err) {
    return { status: err.id, message: `Livro não foi criado - ${err.message}` };
  }
}

// Função para atualizar um livro por ID
function atualizarLivro(id, title, author) {
  try {
    const livro = obterLivroPorId(id);
    if (livro) {
      livro.title = title;
      livro.author = author;
      return livro;
    } else {
      throw { id: 404, message: 'Produto não encontrado' };
    }
  } catch (err) {
    if (err.id === 404) {
      throw { status: 404, message: '404 NÃO ENCONTRADO - ' + err.message };
    } else {
      throw { status: 400, message: '400 BAD REQUEST - ' + err.message };
    }
  }
}
// Função para excluir um livro por ID
function excluirLivro(id) {
  return livroRepository.excluirLivro(id);
}

module.exports = {
  listarLivros,
  obterLivroPorId,
  criarLivro,
  atualizarLivro,
  excluirLivro,
};
