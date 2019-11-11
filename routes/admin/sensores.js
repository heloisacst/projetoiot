var express = require('express');
var router = express.Router();
var sensoresService = require('../../services/sensoresService');

router.get('/', function (req, res, next){
    var sensores = sensoresService.getSensores();

    var data = {
        sensores: sensores
    }
    res.render('admin/sensores/index', data);
});

router.get('/create', function (req, res, next){

    res.render('admin/sensores/create');
});

router.post('/create', function (req, res, next){
    var sensores = sensoresService.getSensores();

    var newId = sensores.lenght + 1;

    var newSensor = {};
    newSensor.id = newId;
    newSensor.código = req.body.código;
    newSensor.nome = req.body.nome;
    newSensor.data = req.body.data;
    newSensor.valor = req.body.valor;
    newSensor.tipo = req.body.tipo;

    sensoresService.saveSensor(newSensor);

    res.redirect('/admin/sensores');
});

module.exports = router;