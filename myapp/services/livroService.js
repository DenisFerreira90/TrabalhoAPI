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
  return livroRepository.criarLivro(title, author);
}

// Função para atualizar um livro por ID
function atualizarLivro(id, title, author) {
  const livroRepository.atualizarLivro(id);
  if (livroRepository){
      throw(id: 404,message:"Produto não Encontrado!:"):
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
