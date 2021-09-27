const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('loggedin');
    res.render('login');
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login'));
            return;
        }

        req.flash('success', 'Welcome back, User!');
        req.session.user = login.user;
        req.session.save(() => res.redirect('/'));
    }
    catch (e) {
        console.error(e);
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}