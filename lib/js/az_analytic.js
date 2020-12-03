//Библиотека JS
//Процедура импорта
//На вход - Текстовая таблица
//Выход - JSON объект
//Библиотека JS


//Процедура импорта
//На вход - Текстовая таблица
//Выход - JSON объект
function Import_txt(txt) {
  var cells = txt.split('\n').map(function (el) { return el.split(/\s+/); });
  var reserv = JSON.stringify(cells);
  var headings = cells.shift();
  var obj = cells.map(function (el) {
    var obj = {};
    for (var i = 0, l = el.length; i < l; i++) {
      obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
    }
    return obj;
  });
  var json = JSON.stringify(obj);
  if (json === "[]") {
    json = reserv
  };
  return json
}

//Процедура суммы
//На вход - JSON объект
//Выход - Число
function azSumm(json_obj) {
  var l1 = Object.keys(json_obj).length;
  var summ = 0;
  for (var i = 0; i < l1; i++) {
    summ += json_obj[i].summa;
  };
  return summ
}

//Процедура группировки по месяцам
//На вход - JSON объект
//Выход - JSON объект
function azGroupObj(json_obj, json_period) {
    var json_sum = [];
    var l1 = Object.keys(json_obj).length;
    var l2 = Object.keys(json_period).length;
    var summ = 0;
    var index = 0;
    var last_obj = {};
    
    while (1 === 1){
        if (index == l1 - 1) { break; };
        var obj = json_obj[index].Obj;
        var summ = 0;
        print(obj);
        if (obj != last_obj) {
            for (var i = 0; i < l1; i++) {
                if (json_obj[i].Obj === obj){
                    for (var j = 0; j < l2; j++){
                        if (json_obj[i].month === json_period[j]) {
                            print(json_obj[i].summa);
                            summ += json_obj[i].summa;
                        }    
                    }
                }
            }
            print(summ);
            last_obj = obj;
            json_sum.push({Obj:obj, summa:summ});
        };
        index++;
    }
    return json_sum
} // группирует объекты по периодам

//Процедура среднего
//На вход - JSON объект
//Выход - Число
function azMedian(json_obj) {
    var l1 = Object.keys(json_obj).length;
    var summ = 0;
    for (var i = 0; i < l1; i++) {
        summ += json_obj[i].summa;  
    }
    res = summ/l1;
    return res;
}
