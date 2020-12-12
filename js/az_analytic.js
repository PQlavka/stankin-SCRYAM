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
  return JSON.parse(json)
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

//Процедура стандартного отклонения 
//На вход - JSON объект
//Выход - Число
function azDeviation(json_obj) {
    var xMedian = azMedian(json_obj);
    var l1 = Object.keys(json_obj).length;
    var deviation = 0;
    for (var i = 0; i < l1; i++) {
        deviation += (json_obj[i].summa - xMedian) * (json_obj[i].summa - xMedian);  
    }
    res = Math.sqrt(deviation/(l1-1));
    return res;
}

//Процедура сортировки
//На вход - JSON объект, key - текстовое поле сортировки, sort (DESC, ASC) - направление сортировки
//Выход - JSON объект
function azSort(json_obj, key, sort="DESC") {
    switch (key) {
      case 'Obj': 
      json_obj.sort(function(obj1, obj2) {
        if (sort == 'DESC') // Сортировка по убыванию
        {
            if (obj1.Obj > obj2.Obj) return -1;
            if (obj1.Obj < obj2.Obj) return 1;
            return 0;
        }
        else  // Сортировка по возрастанию
        {
            if (obj1.Obj < obj2.Obj) return -1;
            if (obj1.Obj > obj2.Obj) return 1;
            return 0;
        }  });     
      break;
      case 'month':
      break;
      case 'summa':
      json_obj.sort(function(obj1, obj2) {
        if (sort == 'DESC') // Сортировка по убыванию
        {
            return obj2.summa-obj1.summa;
        }
        else  // Сортировка по возрастанию
        {
            return obj1.summa-obj2.summa;
        }  });
      break;
      case 'variation':
      json_obj.sort(function(obj1, obj2) {
        if (sort == 'DESC') // Сортировка по убыванию
        {
            return obj2.variation-obj1.variation;
        }
        else  // Сортировка по возрастанию
        {
            return obj1.variation-obj2.variation;
        }  });
      break;
    }
    return json_obj;
}

//Процедура ABC
//На вход - JSON объект
//Выход - JSON объект с доп полем class
function azABC(json_obj) {
    return json_obj;
}

//Процедура XYZ
//На вход - JSON объект
//Выход - JSON объект с доп полем class
function azXYZ(json_obj) {
  var json_variation = []; 
  var json_iN = [];
  var variat = 0;
  var xMedian = azMedian(json_obj);
  var l1 = Object.keys(json_obj).length;  
  for (var i = 0; i < l1; i++) {
        json_iN.push({Obj:json_obj[i].Obj, summa:json_obj[i].summa});
        var devi = azDeviation(json_iN);
        variat = (devi/xMedian)*100;
        json_variation.push({Obj:json_obj[i].Obj, month:json_obj[i].month, summa:json_obj[i].summa, variation:variat});
    }
  var sortedJson = azSort(json_variation, 'variation', "ASC");
  
  var json_class = [];  
  for (var j = 0; j < l1; j++) {
    variat = sortedJson[i].variation; 
       if (variat < 10) 
        {
           json_class.push({Obj:sortedJson[i].Obj, month:sortedJson[i].month, summa:sortedJson[i].summa, variation:'X'});  
        }
        else  if (variat < 25)
        {
            json_class.push({Obj:sortedJson[i].Obj, month:sortedJson[i].month, summa:sortedJson[i].summa, variation:'Y'}); 
        }  
       else  
        {
           json_class.push({Obj:sortedJson[i].Obj, month:sortedJson[i].month, summa:sortedJson[i].summa, variation:'Z'});  
        }  
    }
  
    return json_class;
}

//Процедура ABCXYZ
//На вход - JSON объект
//Выход - JSON объект с доп полем class
function azABCXYZ(json_obj) {
    return json_obj;
}

//Процедура Экспорт
//На вход - JSON объект
//Выход - текстовая таблица
function azExport(json_obj) {
    return JSON.stringify(json_obj);
}
