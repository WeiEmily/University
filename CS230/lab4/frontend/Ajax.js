var users ;
// 1. show all data in the table 
//create event when client click create user run loaduser
document.getElementById('button1').addEventListener('click', loadUser);

//this function is for get data from backed 
function loadUser(){
    //create XMLHttpRequest object 
    var xhr = new XMLHttpRequest();
    // initializes a GET request to the specified URL http://localhost:5000/users
    xhr.open ('GET', 'http://localhost:5000/users', true);
    //use this event handler to access the response data returned by the server
    xhr.onload = function(){
        if(this.status == 200){
            //get data form backed 
            var user = this.responseText;
            //parse data 
            out =  JSON.parse(user).rows;
            users= showToTable(out);
            //show data in the client 
            
        }
    }

    xhr.send();
}


//2. add new user post to backend from Ajax 
// get the data from HTML and get dom of buuton 
const form = document.getElementById('data_form');
const submitButton = document.getElementById('action_button');


// when click submit button 
submitButton.addEventListener('click', function(event) {
    

  //Prevent form submission default behavior
  event.preventDefault();

  //convert form data to formdata object 
  const formData = new FormData(form);

  // send  Ajax request 
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/users/createUser');

  xhr.onreadystatechange = function() {
    // check the status is it done 
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // handle the reply message 
        var alertmsg = `<div class="alert alert-warning alert-dismissible fade show" role="alert"> ${xhr.responseText}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
      //show to client add successful 
      document.getElementById('msg').innerHTML =  alertmsg;
    
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
    xhr.open ('GET', searchUrl, true);
    //use this event handler to access the response data returned by the server
    xhr.onload = function(){
        if(this.status == 200){
            //get data form backed 
            var user = this.responseText;
            //parse data 
            var out =  JSON.parse(user).rows;
            //show data in the client 
            showToTable(out);
        }
    }
    xhr.send();
});

//3. update user from backend  
// get search form data
//I didn't finish the update and delete , but I think it's same as create and search , first need search and show create panel changee date and then same as create for save data 



//just util to show data 

function showToTable (out) {
    var output = '';
            //generate data table base the backend data
            for(var u in out){
                output += '<tr>'+
                    
                    '<td>'+out[u].id+'</td>' +
                    '<td>'+ out[u].title+ '</td>' +
                    '<td>'+ out[u].firstname+ '</td>' +
                    '<td>'+ out[u].surname+ '</td>' +
                    '<td>'+ out[u].mobile+ '</td>' +
                    '<td>'+ out[u].email+ '</td>' +
                    '<td>'+ out[u].address_line_1+ '</td>' +
                    '<td>'+ out[u].address_line_2+ '</td>' +
                    '<td>'+ out[u].town+ '</td>' +
                    '<td>'+ out[u].county_city+ '</td>' +
                    '<td>'+ out[u].eircode+ '</td>' +
                    `<td><span id="edit${u}" class="link-dark"><i class="fa-solid fa-pen-to-square fs-5 me-3"></i></span><span id="delete${u}" class="link-dark"><i class="fa-solid fa-trash fs-5"></i></span></td>' 
                    '</tr>`;
            }
            //insert data to the element 
            document.getElementById('users').innerHTML = output;
            return output;
}
