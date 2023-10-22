// Dados em memória (pode usar um banco de dados real)
let livros = [
  { id: 1, title: 'Livro 1', author: 'Autor 1' },
  { id: 2, title: 'Livro 2', author: 'Autor 2' },
];

// Função para listar todos os livros
function listarLivros() {
  return livros;
}

// Função para obter um livro por ID
function obterLivroPorId(id) {
  return livros.find((livro) => livro.id === id);
}

// Função para criar um novo livro
function criarLivro(title, author) {
  const id = livros.length + 1;
  const novoLivro = { id, title, author };
  livros.push(novoLivro);
  return novoLivro;
}

// Função para atualizar um livro por ID
function atualizarLivro(id, title, author) {
  const livro = obterLivroPorId(id);
  if (livro) {
    livro.title = title;
    livro.author = author;
    return livro;
  }
  return null;
}

// Função para excluir um livro por ID
function excluirLivro(id) {
  const index = livros.findIndex((livro) => livro.id === id);
  if (index !== -1) {
    livros.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  listarLivros,
  obterLivroPorId,
  criarLivro,
  atualizarLivro,
  excluirLivro,
};
