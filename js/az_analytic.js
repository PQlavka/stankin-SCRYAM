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
      case 'part':
      json_obj.sort(function(obj1, obj2) {
        if (sort == 'DESC') // Сортировка по убыванию
        {
            return obj2.part-obj1.part;
        }
        else  // Сортировка по возрастанию
        {
            return obj1.part-obj2.part;
        }  });
      break;
    }
    return json_obj;
}

//Процедура ABC
//На вход - JSON объект
//Выход - JSON объект с доп полем class
function azABC(json_obj) {
  var json_part = [];
  var summ = azSumm(json_obj);
  var part_i = 0;
  var l1 = Object.keys(json_obj).length;  
  for (var i = 0; i < l1; i++) {
        part_i = (json_obj[i].summa / summ)*100;
        json_part.push({Obj:json_obj[i].Obj, month:json_obj[i].month, summa:json_obj[i].summa, part:part_i});
    }
  var sorded_part = azSort(json_part, 'part');
  var json_class = [];
  var CumSum = 0;
  for (var j = 0; j < l1; j++) {
      CumSum = CumSum + json_part[j].part;
    if (CumSum > 95) 
        {
           json_class.push({Obj:sorded_part[j].Obj, month:sorded_part[j].month, summa:sorded_part[j].summa, class:'C'});  
        }
        else  if (CumSum > 80)
        {
             json_class.push({Obj:sorded_part[j].Obj, month:sorded_part[j].month, summa:sorded_part[j].summa, class:'B'}); 
        }  
       else  
        {
            json_class.push({Obj:sorded_part[j].Obj, month:sorded_part[j].month, summa:sorded_part[j].summa, class:'A'});  
        }  
    
    }
    return json_class;
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
    variat = sortedJson[j].variation; 
       if (variat < 10) 
        {
           json_class.push({Obj:sortedJson[j].Obj, month:sortedJson[j].month, summa:sortedJson[j].summa, class:'X'});  
        }
        else  if (variat < 25)
        {
            json_class.push({Obj:sortedJson[j].Obj, month:sortedJson[j].month, summa:sortedJson[j].summa, class:'Y'}); 
        }  
       else  
        {
           json_class.push({Obj:sortedJson[j].Obj, month:sortedJson[j].month, summa:sortedJson[j].summa, class:'Z'});  
        }  
    }
  
    return json_class;
}

//Процедура ABCXYZ
//На вход - JSON объект
//Выход - JSON объект с доп полем class
function azABCXYZ(json_obj) {
  var json_part = [];
  var summ = azSumm(json_obj);
  var part_i = 0;
  var l1 = Object.keys(json_obj).length;  
  for (var i = 0; i < l1; i++) {
        part_i = (json_obj[i].summa / summ)*100;
        json_part.push({Obj:json_obj[i].Obj, month:json_obj[i].month, summa:json_obj[i].summa, part:part_i});
    }
  var sorded_part = azSort(json_part, 'part');
  
 var json_variation_part = []; 
  var json_iN = [];
  var variat = 0;
  var xMedian = azMedian(json_obj);
  var l1 = Object.keys(json_obj).length;  
  for (var i = 0; i < l1; i++) {
        json_iN.push({Obj:sorded_part[i].Obj, summa:sorded_part[i].summa});
        var devi = azDeviation(json_iN);
        variat = (devi/xMedian)*100;
        json_variation_part.push({Obj:sorded_part[i].Obj, month:sorded_part[i].month, summa:sorded_part[i].summa, part:sorded_part[i].part, variation:variat});
    } 
  
  var json_class = [];
  var CumSum = 0;
  for (var j = 0; j < l1; j++) {
      CumSum = CumSum + json_part[j].part;
    if (CumSum > 95) 
        {
           if (variat < 10) 
                {
                   json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'CX'});  
                }
                else  if (variat < 25)
                {
                    json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'CY'}); 
                }  
               else  
                {
                   json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'CZ'});  
                }    
        }
        else  if (CumSum > 80)
        {
             if (variat < 10) 
                {
                   json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'BX'});  
                }
                else  if (variat < 25)
                {
                    json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'BY'}); 
                }  
               else  
                {
                   json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'BZ'});  
                } 
        }  
       else  
        {
            if (variat < 10) 
                {
                   json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'AX'});  
                }
                else  if (variat < 25)
                {
                    json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'AY'}); 
                }  
               else  
                {
                   json_class.push({Obj:json_variation_part[j].Obj, month:json_variation_part[j].month, summa:json_variation_part[j].summa, class:'AZ'});  
                } 
        }  
    
    }
    return json_class;
}
}

//Процедура Экспорт
//На вход - JSON объект
//Выход - текстовая таблица
function azExport(json_obj) {
    return JSON.stringify(json_obj);
}
