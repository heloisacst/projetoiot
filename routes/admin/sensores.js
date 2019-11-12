var express = require('express');
var router = express.Router();
var sensoresService = require('../../services/sensoresService');
var uploader = require('../../middlewares/uploaderMiddle');

router.get('/', function (req, res, next){
    var sensores = sensoresService.getSensores();

    var data = {
        sensores: sensores
    };
    res.render('admin/sensores/index', data);
});

router.get('/create', function (req, res, next){

    res.render('admin/sensores/create');
});

router.post('/create', uploader.single('image'), function (req, res, next){
    var sensores = sensoresService.getSensores();

    var newId = sensores.lenght + 1;

    var newSensor = {};

    newSensor.id = newId;
    newSensor.nome = req.body.nome;
    newSensor.image = req.file.filename;
    newSensor.data = req.body.data;
    newSensor.valor = req.body.valor;
    newSensor.tipo = req.body.tipo;

    sensoresService.saveSensor(newSensor);

    res.redirect('/admin/sensores');
});

module.exports = router;