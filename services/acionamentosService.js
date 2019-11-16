var fs = require('fs');

var acionamentosFilePath = 'db/actuators.json';

var loadFileAcionamentos = function() {
  var fileData = fs.readFileSync(acionamentosFilePath, 'utf8');
  var acionamentos = JSON.parse(fileData);

  return acionamentos;
}

var saveFileAcionamentos = function(acionamentos) {
  var data = JSON.stringify(acionamentos);
  fs.writeFileSync(acionamentosFilePath, data, 'utf8');
}

var getAcionamentos= function() {
  var acionamentos = loadFileAcionamentos();
  return acionamentos;
}

var saveAcionamento = function(newAcionamento) {
  var acionamentos = loadFileAcionamentos();
  acionamentos.push(newAcionamento);
  saveFileAcionamentos(acionamentos);
}

module.exports = {
  getAcionamentos: getAcionamentos,
  saveAcionamento: saveAcionamento
}
