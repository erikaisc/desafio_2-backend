let {contas,saques,depositos,transferencias} = require('../bancodedados');


const depositar = (req, res) => {
    const {numero_conta,valor} = req.body;

    if(!numero_conta || !valor){
        return res.status(400).json({mensagem : "O número da conta e o valor são obrigatórios!"});
    };

    const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));

    if(!contaEncontrada){
        return res.status(404).json({mensagem : "Conta não encontrada!"});
    };

    if(valor <= 0){
        return res.status(400).json({mensagem : "O valor deve ser maior que zero!"});
    };

    contaEncontrada.saldo += Number(valor);

    const registro = {
        data: "",
        numero_conta,
        valor
    }
}

module.exports = {
    depositar
}