const livroService = require('../services/livroService'); // importando modulos

function listar(req, res) {
    const listaLivros = livroService.listarLivros(); 
    res.json(listaLivros);
}

function inserir(req, res) {
    const livro = req.body;
    try {
        livroService.criarLivro(livro); 
        res.status(201).json({ msg: 'Inserido com sucesso!' });
    }
    catch (err) {
        // id -> 400 / msg -> msg de erro
        res.status(err.id).json({ msg: err.message });
    }
}

//Buscar por ID
function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const livro = livroService.obterLivroPorId(id); 
        res.json(livro);
    }
    catch (err) {
        // id -> 404 / msg -> msg de erro
        res.status(err.id).json({ msg: err.message });
    }
}

// Atualizar Livro
function atualizar(req, res) {
    const id = +req.params.id;
    const livro = req.body;

    try {
        livroService.atualizarLivro(id, livro); 
        res.json({ msg: 'Livro atualizado com sucesso' });
    }
    catch (err) {
        res.status(err.id).json({ msg: err.message });
    }
}

// Deletar Livro por ID
function deletar(req, res) {
    const id = +req.params.id;
    try {
        const livroDeletado = livroService.excluirLivro(id); 
        res.json(livroDeletado);
    }
    catch (err) {
        res.status(err.id).json({ msg: err.message });
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};
