const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    registeredBy: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body, id) {
        this.body = body;
        this.errors = [];
        this.contato = null;
        this.id = id;
    }

    async edit(id) {
        if (typeof id !== 'string') return;

        this.validate();
        if (this.errors.length) return;

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }


    async register() {
        this.validate();
        if (this.errors.length) return;

        this.contato = await ContatoModel.create(this.body);
    }

    validate() {
        this.cleanUp();

        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório');

        if (this.body.nome.length < 2 || this.body.nome.length > 30) this.errors.push('O nome precisa ter entre 3 e 50 caracteres');

        if (!this.body.email && !this.body.telefone) this.errors.push('Ao menos um contato precisa ser serviado: e-mail ou telefone');

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        if (/\D/.test(this.body.telefone)) this.errors.push('O telefone deve conter apenas números');


    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
            registeredBy: this.id
        }
    }

    static async findByID(id) {
        if (typeof id !== 'string') return;

        const contato = await ContatoModel.findById(id);
        return contato;
    }

    static async findContato() {
        const contatos = await ContatoModel.find().sort({ criadoEm: -1 })
        return contatos;
    }

    static async deleteContato(id) {
        await ContatoModel.deleteOne({ _id: id });
    }
}

module.exports = Contato;


