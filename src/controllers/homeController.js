const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
    try {
        const contatos = await Contato.findContato();
        res.render('index', { contatos });
    } catch (e) {console.error(e);}
}

