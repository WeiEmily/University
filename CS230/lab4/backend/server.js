const http = require('http')
const database  = require('./db')
const getUsers = require('./getUsers')
const createUser = require('./createUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')
//please install pg first :npm install pg





const PORT = 5000;
//https://codeparadox.in/create-rest-api-and-crud-in-node-js-without-any-framework




//create server object 
const server = http.createServer(async (req, res) => {
    
    let method = req.method;
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    switch (method) {
        //when metho is get 
        case "GET":
            
            getUsers(req, res);

        break

        case "POST":
            createUser(req, res);
          
        break

        case "PUT":
            updateUser(req, res);
          
        break
s
        case "DELETE":
        
         deleteUser(req, res);
          
        break

        default:
        res.writeHead(400, { "Content-type": "text/plain" })
        res.write("Invalid URL")
        res.end()
    }
    
    
})


// get the server to start listening
server.listen(PORT, err => {
    // error checking
    err ? console.error(err) : console.log(`listening on port ${PORT}`)
  })


