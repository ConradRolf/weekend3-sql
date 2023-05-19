$(document).ready(onReady);

function onReady() {
    console.log('We have jQuery! 💲💲💲');

}

function getList(){
    $('#viewList').empty();
    console.log( 'in getList' );
    $.ajax({
      type: 'GET',
      url: '/list'
    }).then(function(response) {
      console.log('GET, /list', response);
    }).catch(error => {
        console.log('Error', error);
})}