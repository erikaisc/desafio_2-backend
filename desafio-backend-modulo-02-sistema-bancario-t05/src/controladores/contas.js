let {banco,contas,ultimoID} = require('../bancodedados');

const listarContas = (req, res) => {
    const {senha_banco} = req.query;

    if(!senha_banco){
        return res.status(400).json({mensagem : "A senha do banco informada é obrigatória!"});
    }

    if(senha_banco !== banco.senha){
        return res.status(401).json({mensagem : "A senha do banco informada é inválida!"});
    }

    return res.json(contas);
}

const criarConta = (req, res) => {
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;

    if(!nome){
        return res.status(400).json({mensagem : "O nome do cliente é obrigatório!"});
    };

    if(!cpf){
        return res.status(400).json({mensagem : "O CPF do cliente é obrigatório!"});
    };

    if(!data_nascimento){
        return res.status(400).json({mensagem : "A data de nascimento do cliente é obrigatória!"});
    };

    if(!telefone){
        return res.status(400).json({mensagem : "O telefone do cliente é obrigatório!"});
    };

    if(!email){
        return res.status(400).json({mensagem : "O email do cliente é obrigatório!"});
    };

    if(!senha){
        return res.status(400).json({mensagem : "A senha do cliente é obrigatória!"});
    };

    const contaExiste = contas.find(conta => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

    if(contaExiste){
        return res.status(400).json({mensagem : "E-mail e/ou CPF já existente!"});
    }

    const novaConta = {
        numero: ultimoID++,
        saldo: 0,
            usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(novaConta);

    return res.status(201);
}

module.exports = {
    listarContas,
    criarConta
}