var users;
var address = []; //save address data
// 1. show all data in the table 
//create event when client click create user run loaduser
document.getElementById('button1').addEventListener('click', loadUser);

//this function is for get data from backed 
function loadUser() {
  //create XMLHttpRequest object 
  var xhr = new XMLHttpRequest();
  // initializes a GET request to the specified URL http://localhost:5000/users
  xhr.open('GET', 'http://localhost:5000/users', true);
  //use this event handler to access the response data returned by the server
  xhr.onload = function () {
    if (this.status == 200) {
      //get data form backed 
      var user = this.responseText;
      //parse data 
      out = JSON.parse(user).rows;
      //show data in the client 
      users = showToTable(out);
    }
  }
  xhr.send();
}


//2. add new user post to backend from Ajax 
// get the data from HTML and get dom of buuton 
const form = document.getElementById('data_form');
const submitButton = document.getElementById('action_button');


// when click submit button 
submitButton.addEventListener('click', function (event) {


  //Prevent form submission default behavior
  event.preventDefault();

  //convert form data to formdata object 
  const formData = new FormData(form);

  // send  Ajax request 
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/users/createUser');

  xhr.onreadystatechange = function () {
    // check the status is it done 
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // handle the reply message 
      var alertmsg = `<div class="alert alert-warning alert-dismissible fade show" role="alert"> ${xhr.responseText}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
      //show to client add successful 
      document.getElementById('msg').innerHTML = alertmsg;

    }

  };

  //sent to the server.
  xhr.send(formData);
});

//3. search user from backend  

//create event when client click create user run loaduser
// get search form data
const searchForm = document.getElementById('searchForm');
const searchItem = document.getElementById('searchItem');

// listen submit event ，prevent refresh page 
searchForm.addEventListener('submit', (event) => {

  //Prevent form submission default behavior
  event.preventDefault();

  // get the data from the form 
  const inputValue = searchItem.value;

  // initializes a GET request to the specified URL http://localhost:5000/users/search item 
  var searchUrl = 'http://localhost:5000/users/' + inputValue;

  //create XMLHttpRequest object 
  var xhr = new XMLHttpRequest();

  //use this event handler to access the response data returned by the server
  xhr.open('GET', searchUrl, true);
  //use this event handler to access the response data returned by the server
  xhr.onload = function () {
    if (this.status == 200) {
      //get data form backed 
      var user = this.responseText;
      //parse data 
      var out = JSON.parse(user).rows;
      //show data in the client 
      showToTable(out);
    }
  }
  xhr.send();
});



//below is util function 
//1. just util to show data 
function showToTable(out) {

  var output = '';

  //generate data table base the backend data
  for (var u in out) {
    //push address list to array 
    address.push(out[u].address);
    var no = (Number)(u) + 1;
    output += '<tr>' +
      '<td>' + no + '</td>' +
      '<td>' + out[u].title + '</td>' +
      '<td>' + out[u].firstname + '</td>' +
      '<td>' + out[u].surname + '</td>' +
      '<td>' + out[u].mobile + '</td>' +
      '<td>' + out[u].email + '</td>' +
      `<td>
      
      <!-- Button trigger modal -->
      <button type="button" class="address btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Address
      </button>
      
      </td>` +
      '<td>Order</td>' +
      '<td><span  class="link-dark"><i class="fa-solid fa-pen-to-square fs-5 me-3"></i></span><span  class="link-dark"><i class="fa-solid fa-trash fs-5"></i></span></td>' +
      '</tr>'
  }


  //insert data to the element 
  document.getElementById('users').innerHTML = output;

  return output;
}


//4. show current user address list
function showAddress() {

}

//2. just util to show each addressdata 
function showAddressData(index) {
  var output = '';

  console.log(index);
  //generate data table base the backend data
  for (var u in address[index]) {
    var no = (Number)(u) + 1;
    output += '<tr>' +
      '<td>' + no + '</td>' +
      '<td>' + address[index][u].address_line1 + '</td>' +
      '<td>' + address[index][u].address_line2 + '</td>' +
      '<td>' + address[index][u].town + '</td>' +
      '<td>' + address[index][u].city + '</td>' +
      '<td>' + address[index][u].eircode + '</td>' +

      '<td><span  class="link-dark"><i class="fa-solid fa-pen-to-square fs-5 me-3"></i></span><span  class="link-dark"><i class="fa-solid fa-trash fs-5"></i></span></td>' +
      '</tr>'
  }

  //insert data to the element 
  document.getElementById('addressContent').innerHTML = output;
  return output;
}