const produtoService = require('../service/livroService')


function listar(req, res) {
    const listaProdutos = livro.Service.listar();
    res.json(listaLivro);
}

function inserir(req, res) {
    let livro = req.body;
    try {
        livro.Service.inserir(livro);
      res.status(201).json({msg:'Inserido com sucesso!'})
    }
    catch(err) {
      //id-> 400 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const prod = livro.Service.buscarPorId(id);
      res.json(prod);
    }
    catch(err) {
      //id-> 404 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

function atualizar (req, res) {
    const id = +req.params.id;
    let livro = req.body;
  
    try{ 
      livro.Service.atualizar(id, livro);
      res.json({msg:'Produto atualizado com sucesso'});
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const livroDeletado = livro.Service.deletar(id);
      res.json(livroDeletado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }   
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}
