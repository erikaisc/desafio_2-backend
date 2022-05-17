const express = require('express');
const rotas = express();
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');

rotas.get('/contas',contas.listarContas);
rotas.post('/contas',contas.criarConta);
rotas.put('/contas/:numeroConta/usuario',contas.atualizarUsuario);
rotas.delete('/contas/:numeroConta',contas.excluirConta);

rotas.get('/contas/saldo',contas.saldo);
rotas.get('/contas/extrato',contas.extrato);

rotas.post('/transacoes/depositar',transacoes.depositar);
rotas.post('/transacoes/sacar',transacoes.sacar);
rotas.post('/transacoes/transferir',transacoes.transferir);

module.exports = rotas;

