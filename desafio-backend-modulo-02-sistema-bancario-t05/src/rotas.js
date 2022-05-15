const express = require('express');
const rotas = express();
const contas = require('./controladores/contas')

rotas.get('/contas',contas.listarContas);
rotas.post('/contas',contas.criarConta);

module.exports = rotas;

