function summ_test() {
  txt = $('#inp').val()
  console.log(txt)
  $('#res').html(Import_txt(txt).toString())
}