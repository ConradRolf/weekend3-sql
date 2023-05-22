$(document).ready(onReady);

// setting up click listeners and functions to run when the document is ready
function onReady() {
    console.log('We have jQuery! 💲💲💲');
    getList();
    $('#addButton').on('click', postList)
    $('#viewList').on('click', '#delete-btn', deleteTask)
    $('#viewList').on('click', '#complete-btn', updateTask)
}

// function to get the items from the server using a GET request and render them to the DoM using a conditional based
// on whether or not the task has been complete
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
                <td><button id="complete-btn">Finished?</button></td>
                <td><button id="delete-btn">Giving up?</button></td>
            </tr>
            `);
            else if (response[i].complete === 'yes')
            $('#viewList').append(`
            <tr data-id=${response[i].id} class="green">
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

// a function that takes user inputs from the DoM and POSTs them to the server and then resets the input fields
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

// A function that updates a task using the PUT method to mark it off as complete on the DoM and updates it on the server
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

// a function to delete a task using the DELETE method, it will remove it from the data base and the DoM
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