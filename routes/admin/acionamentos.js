var express = require('express');
var router = express.Router();
var acionamentosService = require('../../services/acionamentosService');

router.get('/', function (req, res, next){
    var acionamentos = acionamentosService.getAcionamentos();

    var data = {
        acionamentos: acionamentos
    };
    res.render('admin/acionamentos/index', data);
});

router.get('/create', function (req, res, next){

    res.render('admin/acionamentos/create');
});

router.post('/create', function (req, res, next){
    var acionamentos = acionamentosService.getAcionamentos();
    

    var newId = acionamentos.length + 1;

    var newAcionamento = {};
    newAcionamento.id = newId;
    newAcionamento.name = req.body.name;
    newAcionamento.status = 0;
    acionamentosService.saveAcionamento(newAcionamento);

    res.redirect('/admin/acionamentos');
    
});

module.exports = router;