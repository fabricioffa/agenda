const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('signIn');
}

exports.signIn = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/signIn'));
            return;
        }

        req.flash('success', 'Wellcome, User!');
        req.session.save(() => res.redirect('/'));
    } catch (e) {
        console.error(e);
        return res.render('404');
    }
};