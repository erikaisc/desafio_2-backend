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

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha){
        return res.status(400).json({mensagem : "Todos os campos são obrigatórios!"});
    };

    const contaExiste = contas.find(conta => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

    if(contaExiste){
        return res.status(400).json({mensagem : "E-mail e/ou CPF já existente!"});
    };

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

    return res.status(201).send();
}

const atualizarUsuario = (req, res) => {
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;
    const {numeroConta} = req.params;

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha){
        return res.status(400).json({mensagem : "Todos os campos são obrigatórios!"});
    };

    const contaEncontrada = contas.find(conta => conta.numero === Number(numeroConta));

    if(!contaEncontrada){
        return res.status(404).json({mensagem : "Conta não encontrada!"});
    }

    if(cpf !== contaEncontrada.usuario.cpf){
        const existeCPF = contas.find(conta => conta.usuario.cpf === cpf);

        if(existeCPF){
            return res.status(404).json({mensagem : "O CPF cadastrado já existe!"});

        }
    }

    if(email !== contaEncontrada.usuario.email){
        const existeEmail = contas.find(conta => conta.usuario.email === email);

        if(existeEmail){
            return res.status(404).json({mensagem : "O E-mail cadastrado já existe!"});
        }
    }
    contaEncontrada.usuario = {nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };

    return res.status(204).send();
}

const excluirConta = (req, res) => {
    const {numeroConta} = req.params;

    const contaEncontrada = contas.find(conta => conta.numero === Number(numeroConta));

    if(!contaEncontrada){
        return res.status(404).json({mensagem : "Conta não encontrada!"});
    };

    if(contaEncontrada.saldo > 0){
        return res.status(403).json({mensagem : "Não é possível excluir uma conta com saldo!"});
    };

    contas = contas.filter(conta => conta.numero !== Number(numeroConta));

    return res.status(204).send();
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta
}