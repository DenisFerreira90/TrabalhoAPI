const express = require('express');
const router = express.Router();
const livroController = require('../controller/livros.controler'); 
const livroService = require('../services/livroService') // importando modulos

// Roteador: /api/livros 
router.get('/', livroController.listar);
router.post('/', livroController.inserir);
router.get('/:id', livroController.buscarPorId);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);

module.exports = router;


/*
Usar arquivos de roteamento separados é uma prática comum em aplicativos Node.js e Express para manter o código organizado e modular.
 Isso torna seu código mais fácil de gerenciar,
 especialmente à medida que seu aplicativo cresce e você tem várias rotas e funcionalidades.
 */

//https://github.com/profries/dsa_2023_2_aula11_api_crud_produtos/blob/master/router/produto_router.js