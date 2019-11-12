var express = require('express');
var router = express.Router();
var acionamentosService = require('../../services/acionamentosService');
var uploader = require('../../middlewares/uploaderMiddle');

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

router.post('/create', uploader.single('image'), function (req, res, next){
    var acionamentos = acionamentosService.getAcionamentos();

    var newId = acionamentos.lenght + 1;

    var newAcionamento = {};
    newAcionamento.id = newId;
    newAcionamento.name = req.body.nome;
    newSensor.image = req.file.filename;
    newAcionamento.status = req.body.status;

    acionamentosService.saveAcionamento(newAcionamento);

    res.redirect('/admin/acionamentos');
});

module.exports = router;