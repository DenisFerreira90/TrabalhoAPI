const express = require('express');
const router = express.Router();
const livroController = require('../controller/livroController'); // Nome do módulo
// Roteador: /api/livros 
router.get('/', livroController.listar);
router.post('/', livroController.inserir);
router.get('/:id', livroController.buscarPorId);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);

module.exports = router;



//https://github.com/profries/dsa_2023_2_aula11_api_crud_produtos/blob/master/router/produto_router.js