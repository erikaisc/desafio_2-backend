const express = require('express');
const rotas = express();
const contas = require('./controladores/contas')

rotas.get('/contas',contas.listarContas);
rotas.post('/contas',contas.criarConta);
rotas.put('/contas/:numeroConta/usuario',contas.atualizarUsuario);
rotas.delete('/contas/:numeroConta',contas.excluirConta);


module.exports = rotas;

