//Общий JS
function parse_period() { 
  per = $('#per').val();
  return JSON.stringify(per.split(' '));
} //Работа с периодами

function import_test() {
  txt = $('#inp').val();
  $('#res').html(Import_txt(txt).toString());
}
function abc_test() {
  txt = $('#inp').val();
  $('#res').html(azABC(json_obj));
}
function abcxyz_test() {
  txt = $('#inp').val();
  $('#res').html(azABCXYZ(json_obj));
}
function export_test() {
  txt = $('#inp').val();
  $('#res').html(azExport(json_obj));
}
function med_test() {
  txt = Import_txt($('#inp').val());
  period = parse_period();
  grouped_json = azGroupObj(JSON.parse(txt), JSON.parse(period));
  $('#res').html(azSumm(grouped_json));
}
function dev_test() {
  txt = $('#inp').val();
  $('#res').html(azDeviation(json_obj));
}
function sort_test() {
  txt = $('#inp').val();
  $('#res').html(azSort(json_obj, key, sort="DESC"));
}
function summ_test() {
  txt = Import_txt($('#inp').val());
  period = parse_period();
  grouped_json = azGroupObj(JSON.parse(txt), JSON.parse(period));
  $('#res').html(azSumm(grouped_json));
}
function xyz_test() {
  txt = $('#inp').val();
  $('#res').html(azXYZ(json_obj));
}

