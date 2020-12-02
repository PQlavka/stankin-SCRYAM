//Библиотека JS
//Процедура импорта
//На вход - Текстовая таблица
//Выход - JSON объект
function Import_txt(txt) {
  var cells = txt.split('\n').map(function (el) { return el.split(/\s+/); });
  var headings = cells.shift();
  var obj = cells.map(function (el) {
    var obj = {};
    for (var i = 0, l = el.length; i < l; i++) {
      obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
    }
    return obj;
  });
  var json = JSON.stringify(obj);

  return json
}
