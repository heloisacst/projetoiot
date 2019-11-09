var express = require('express');
var router = express.Router();
var authService = require('../services/authServices');

router.get('/login', function(req, res, next) {

  res.render('login', { msg: '' });
});

router.post('/login', function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  if (authService.validateUserEmailAndPassword(email, password)) {
    if(!req.session.authenticatedUsers) {
      req.session.authenticatedUsers = []; //esse vetor vazio é necessário para não ocorrer erro no primeiro login
    }

    var user = authService.getUserByEmail(email);
    user.loginToken = authService.generateToken();

    req.session.authenticatedUsers.push(user);
    res.cookie('loginToken', user.loginToken, { maxAge: 900000, httpOnly: true }); //chama do service -- armazena no navegador do usuário 

    res.redirect('/admin/posts');
  } 
  

  res.render('login', { msg: 'E-mail e senha incorretos' });
});


router.get('/logout', function(req, res, next) {
  var loginToken = req.cookies['loginToken'];

  if(req.session.authenticatedUsers) {
    var authenticatedUsers = req.session.authenticatedUsers;
    var user = authenticatedUsers.find(u => u.loginToken === loginToken);

    if (user) {
      authenticatedUsers.splice(authenticatedUsers.findIndex(u => u.loginToken === loginToken), 1);
      res.clearCookie("loginToken");
    }
  }

  res.redirect('/');
});

module.exports = router;