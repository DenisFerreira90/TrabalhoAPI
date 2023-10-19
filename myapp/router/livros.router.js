const express = require('express')
const router = express.Router()
const produtoController = require('../controller/produto_controller')

//router: /api/produtos
router.get('/', livros.controler.listar);
router.post('/', livros.controler.inserir);
router.get('/:id', livros.controler.buscarPorId);
router.put('/:id', livros.controler.atualizar);
router.delete('/:id', livros.controler.deletar);

module.exports = router;



//https://github.com/profries/dsa_2023_2_aula11_api_crud_produtos/blob/master/router/produto_router.js