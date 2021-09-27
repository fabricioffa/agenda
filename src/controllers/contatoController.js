const { render } = require('ejs');
const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
}

exports.register = async (req, res) => {
    const contato = new Contato(req.body, req.session.user._id);

    try {
        await contato.register();

        if (contato.errors.length) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        req.flash('success', `Contato cadastrado com sucesso, User`);
        req.session.save(() => res.redirect('/'));

        return;
    }
    catch (e) {
        console.error(e);
        return res.render('404');
    }
}

exports.editContato = async (req, res) => {
    if (!req.params.id) return res.render('404');

    try {
        const contato = await Contato.findByID(req.params.id);

        if (!contato) return res.render('404');

        res.render('contato', { contato })


    } catch (e) {
        console.error(e);
    }
}

exports.edit = async (req, res) => {
    const contato = new Contato(req.body);
    try {
        await contato.edit(req.params.id);

        if (contato.errors.length) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect(`/contato/${req.params.id}`));
            return;
        }

        req.flash('success', 'Contato editado');
        req.session.save(() => res.redirect(`/contato/${req.params.id}`));
        return

    } catch (e) {
        console.error(e);
        res.render('404');
    }
    
}

exports.delete = async (req, res) => {
    try {
        const contato = new Contato();
        await Contato.deleteContato(req.params.id);

        req.flash('success', 'Contato removido')
        req.session.save(() => res.redirect('/'))
    } 
    catch (e) {console.error(e);}
}
