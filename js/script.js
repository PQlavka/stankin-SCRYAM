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
  $('#res').html(Import_txt(txt).toString());
}
function abcxyz_test() {
  txt = $('#inp').val();
  $('#res').html(Import_txt(txt).toString());
}
function export_test() {
  txt = $('#inp').val();
  $('#res').html(Import_txt(txt).toString());
}
function med_test() {
  txt = Import_txt($('#inp').val());
  period = parse_period();
  grouped_json = azGroupObj(JSON.parse(txt), JSON.parse(period));
  $('#res').html(azSumm(grouped_json));
}
function dev_test() {
  txt = $('#inp').val();
  $('#res').html(Import_txt(txt).toString());
}
function sort_test() {
  txt = $('#inp').val();
  $('#res').html(Import_txt(txt).toString());
}
function summ_test() {
  txt = Import_txt($('#inp').val());
  period = parse_period();
  grouped_json = azGroupObj(JSON.parse(txt), JSON.parse(period));
  $('#res').html(azSumm(grouped_json));
}
function xyz_test() {
  txt = $('#inp').val();
  $('#res').html(Import_txt(txt).toString());
}

