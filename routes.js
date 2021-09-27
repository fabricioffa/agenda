const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const signInController = require('./src/controllers/signInController');
const { loginRequired } = require('./src/middlewares/middleware');
// A página inicial de cada rota vai se chamar index, e.g., /login/index

// Rotas da home: 
route.get('/', homeController.index);

// Sign in routes
route.get('/signIn', signInController.index); 
route.post('/signIn/register', signInController.signIn); 


// Rotas de login: 
route.get('/login', loginController.index); 
route.get('/logout', loginController.logout); 
route.post('/login/login', loginController.login); 

// Rotas de contato
route.get('/contato', loginRequired, contatoController.index); 
route.get('/contato/:id', loginRequired, contatoController.editContato); 
route.post('/contato/edit/:id', loginRequired, contatoController.edit); 
route.get('/contato/delete/:id', loginRequired, contatoController.delete); 
route.post('/contato/register', loginRequired, contatoController.register); 

module.exports = route;