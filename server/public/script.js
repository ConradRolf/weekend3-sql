$(document).ready(onReady);

function onReady() {
    console.log('We have jQuery! 💲💲💲');
    getList();
    $('#addButton').on('click', postList)
    $('#viewList').on('click', '#delete-btn', deleteTask)
    $('#viewList').on('click', '#complete-btn', updateTask)
}

function getList(){
    $('#viewList').empty();
    console.log( 'in getList' );
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function(response) {
        console.log('GET, /list', response);
        for (let i= 0; i , response.length; i++) {
            if (response[i].complete === 'no')
            $('#viewList').append(`
            <tr data-id=${response[i].id}>
                <td>${response[i].name}</td>
                <td>${response[i].task}</td>
                <td>${response[i].complete} <button id="complete-btn">Finished?</button></td>
                <td><button id="delete-btn">Giving up?</button></td>
            </tr>
            `);
            else if (response[i].complete === 'yes')
            $('#viewList').append(`
            <tr data-id=${response[i].id}>
                <td>${response[i].name}</td>
                <td>${response[i].task}</td>
                <td>✅</td>
                <td><button id="delete-btn">Giving up?</button></td>
            </tr>
            `);
        }
    }).catch(error => {
    console.log('Error', error);
})}

function postList(event) {
    event.preventDefault();
    let taskToSend = {
        name: $('#nameIn').val(),
        task: $('#taskIn').val(),
        complete: $('#completeIn').val()
    };
    $.ajax({
        type: 'POST',
        url: '/list',
        data: taskToSend
    }).then(function(response) {
        $('#nameIn').val(''),
        $('#taskIn').val(''),
        $('#completeIn').val('')
        getList();
    });
};

function updateTask(event){
    event.preventDefault();
    console.log('Task complete')
    const idToUpdate = $(this).closest('tr').data('id');

    $.ajax({
        type: 'PUT',
        url: `/list/${idToUpdate}`,
    }).then(function (response) {
        console.log(response)
        getList();
    }).catch(function (error) {
        console.log('Error with updating task : ', error);
    })
}

function deleteTask(event){
    event.preventDefault();
    const taskToDelete = $(this).closest('tr').data('id');

    console.log("Inside delete function. Task to delete:", taskToDelete);

    $.ajax({
        type: 'DELETE',
        url: `/list/${taskToDelete}`
    }).then(function (response) {
        getList();
    }).catch(function (error) {
        console.log('Error with delete function: ', error);
    })
}