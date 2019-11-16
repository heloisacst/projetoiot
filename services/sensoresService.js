var fs = require('fs');

var sensoresFilePath = 'db/temp_sensors.json';

var loadFileSensores = function() {
  var fileData = fs.readFileSync(sensoresFilePath, 'utf8');
  var sensores = JSON.parse(fileData);

  return sensores;
}

var saveFileSensores = function(sensores) {
  var data = JSON.stringify(sensores);
  fs.writeFileSync(sensoresFilePath, data, 'utf8');
}

var getSensores = function() {
  var sensores = loadFileSensores();
  return sensores;
}

var saveSensor = function(newSensor) {
  var sensores = loadFileSensores();
  sensores.push(newSensor);
  saveFileSensores(sensores);
}

module.exports = {
  getSensores: getSensores,
  saveSensor: saveSensor
}