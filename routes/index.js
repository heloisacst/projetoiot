var express = require('express');
var router = express.Router();
var sensoresService = require('../services/sensoresService');
var acionamentosService = require('../services/acionamentosService');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sensores = sensoresService.getSensores();
  var acionamentos = acionamentosService.getAcionamentos();

  res.render('index', {title: 'Home', sensores: sensores, acionamentos: acionamentos });
});

router.get('/sensores/:sensorId', function(req, res, next) {
  var sensorId = req.params.sensorId;

  var sensores = sensoresService.getSensores();

  var sensor = sensores.filter((sensor) => sensor.id == sensorId)[0];

  res.render('sensor', { title: 'Sensores', sensor: sensor });

});

router.get('/sensores', function(req, res, next) {

  var sensores = sensoresService.getSensores();

  res.render('all_sensors', { title: 'Sensores', sensor: sensores });

});

router.get('/acionamentos', function(req, res, next)
{
  var acionamentos = acionamentosService.getAcionamentos();

  res.render('acionamentos', { title: 'Acionamentos', acionamentos: acionamentos });
});

router.get('/acionamento/:acionamentoId', function(req, res, next)
{
  var acionamentoId = req.params.acionamentoId;

  var acionamentos = sensoresService.getSensores();

  var acionamento = acionamentos.filter((acionamento) => acionamento.id == acionamentoId)[0];

  res.render('acionamento', { title: 'Acionamento', acionamento: acionamento });
});

router.post('/create', function (req, res, next){
  var acionamento = acionamentosService.getAcionamentos();
  
  var newAcionamento = {};
  newAcionamento.id = req.body.id;
  newAcionamento.status = req.body.status == 1 ? 0 : 1;
  acionamentosService.updateAcionamento(newAcionamento);

  res.redirect('/');
});

module.exports = router;