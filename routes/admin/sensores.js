var express = require('express');
var router = express.Router();
var sensoresService = require('../../services/sensoresService');

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

router.post('/create', function (req, res, next){
    var sensores = sensoresService.getSensores();
  
    var newId = sensores.length + 1;

    var newSensor = {};

    newSensor.id = newId;
    newSensor.name = req.body.name;
    newSensor.date = req.body.date;
    newSensor.temperature = req.body.temperature;
    newSensor.humidity = req.body.humidity;

    sensoresService.saveSensor(newSensor);

    res.redirect('/admin/sensores');
});

module.exports = router;