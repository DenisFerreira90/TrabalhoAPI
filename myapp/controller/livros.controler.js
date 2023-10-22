const livroService = require('../service/livroService'); // Nome do módulo corrigido

function listar(req, res) {
    const listaLivros = livroService.listarLivros(); // Corrigir o nome da função no módulo
    res.json(listaLivros);
}

function inserir(req, res) {
    const livro = req.body;
    try {
        livroService.inserirLivro(livro); // Corrigir o nome da função no módulo
        res.status(201).json({ msg: 'Inserido com sucesso!' });
    }
    catch (err) {
        // id -> 400 / msg -> msg de erro
        res.status(err.id).json({ msg: err.message });
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const livro = livroService.obterLivroPorId(id); // Corrigir o nome da função no módulo
        res.json(livro);
    }
    catch (err) {
        // id -> 404 / msg -> msg de erro
        res.status(err.id).json({ msg: err.message });
    }
}

function atualizar(req, res) {
    const id = +req.params.id;
    const livro = req.body;

    try {
        livroService.atualizarLivro(id, livro); // Corrigir o nome da função no módulo
        res.json({ msg: 'Produto atualizado com sucesso' });
    }
    catch (err) {
        res.status(err.id).json({ msg: err.message });
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try {
        const livroDeletado = livroService.excluirLivro(id); // Corrigir o nome da função no módulo
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
