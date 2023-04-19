const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./db');
const usersController = require('./controllers/usersController');
const orderController = require('./controllers/orderController');
const phoneController = require('./controllers/phoneController');

const http = require('http')

require('dotenv').config();

connectDB();

//create server object 
const server = http.createServer(async (req, res) => {
    //// Enable CORS
    cors({ origin: '*' })(req, res, () => {

        //user part 
        //if route us GET /users and url is get user 
        if (req.url === '/users' && req.method === 'GET') {
            //link to function in usersController of get users 
            usersController.getUsers(req, res);
        }
        //search user by email
        else if (req.url.match(/\users\/([A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z]+)/) && req.method === 'GET') {

            const email = req.url.split("/")[2];
            usersController.searchByEmail(req, res, email);
        }
        //create users 
        else if (req.url === "/users/createUser" && req.method === 'POST') {
            usersController.createUser(req, res);
        }
        //search user by name
        else if (req.url.match(/\users\/([A-Za-z]+_[A-Za-z]+)/) && req.method === 'GET') {

            usersController.searchByName(req, res);
        }
        //update a user
        else if (req.url === '/user/updateUser' && req.method === 'PUT') {

            usersController.updateUser(req, res);
        }
        //add new address 
        else if (req.url.match(/^\/users\/updateUser\/addAddress.*/) && req.method === 'PUT') {

            usersController.addUserAddress(req, res);
        }
        //remove  address 
        else if (req.url.match(/^\/users\/updateUser\/removeAddress.*/) && req.method === 'PUT') {

            usersController.removeUserAddress(req, res);
        }
        //delete a user
        else if (req.url.match(/^\/users\/deleteUser\/[^\s@]+@[^\s@]+\.[^\s@]+$/) && req.method === 'DELETE') {
            usersController.deleteUser(req, res);
        }
        //-----------finish user part --------------------------

        //order part 
        //get all orders 
        else if (req.url === '/orders' && req.method === 'GET') {
            orderController.getOrders(req, res);
        }
        //create orders 
        else if (req.url === "/orders/createOrder" && req.method === 'POST') {
            orderController.createOrder(req, res);
        }
        //update orders 
        else if (req.url.match(/^\/orders\/updateOrder.*$/) && req.method === 'PUT') {

            orderController.updateOrder(req, res);
        }

        //delete order
        else if (req.url.match(/^\/orders\/deleteOrder\/[A-Za-z0-9]+$/) && req.method === 'DELETE') {
            orderController.deleteOrder(req, res);
        }
        //----------------finish orders part -------------------------

        //Phones part 
        //get all Phones 
        else if (req.url === '/phones' && req.method === 'GET') {
            phoneController.getPhones(req, res);
        }
        //search phone by 
        else if (req.url.match(/^\/phones\/[A-Za-z]+.*/) && req.method === 'GET') {
            phoneController.searchPhone(req, res);
        }
        //create phone
        else if (req.url === "/phones/createPhone" && req.method === 'POST') {
            phoneController.createPhone(req, res);
        }

        //update phone 
        else if ((req.url === '/phones/updatePhone') && req.method === 'PUT') {
            phoneController.updatePhone(req, res);
        }
        //delete phone
        else if (req.url.match(/^\/phones\/deletePhone\/[A-Za-z]+.*/) && req.method === 'DELETE') {

            phoneController.deletePhone(req, res);
        }

        //----------------finish phones part -------------------------
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    message: 'Route Not Found: Please use the api/products endpoint',
                })
            );
        }
    });
});


// get the server to start listening
server.listen(process.env.PORT, err => {
    // error checking
    err ? console.error(err) : console.log(`listening on port ${process.env.PORT}`)
})


