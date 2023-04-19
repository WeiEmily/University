const database  = require('./db')

//@desc Get All users

async function getUsers(req, res) {
    //check the url users mean show all users 
    if(req.url === "/users") {
        try {
            //query in postgreSQL 
            const { rows } = await database.client.query(
            'SELECT * FROM Users, users_info, shipping_address WHERE(Users.id= users_info.id) and(users_info.addressID = shipping_address .addressID)'
            );
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ rows}));
            
        } catch (error) {
            console.log(error)
        }
    
        //users/:id : GET
    }else if(req.url.match(/\users\/([0-9]+)/)){

        try {
            // get the id from url regular
            const id = req.url.split("/")[2];
            
            const { rows } = await database.client.query('SELECT * FROM Users, users_info, shipping_address WHERE(Users.id= users_info.id) and(users_info.addressID = shipping_address .addressID) AND Users.id = $1',
            [id]);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ rows}));
            
        } catch (error) {
            console.log(error)
        }
        //check the body information for search name 
    }else if(req.url.match(/\users\/([A-Za-z]+_[A-Za-z]+)/)){
        try {
           // get the id from url
           const id = req.url.split("/")[2];
           const name = id.split("_");

            
      
              // getdata from body 
              const firstname = name[0];
              const surname = name[1];

              // search in  PostgreSQL batabase
              const { rows } = await database.client.query(
                `
                SELECT * FROM Users, users_info, shipping_address WHERE(Users.id= users_info.id) and(users_info.addressID = shipping_address .addressID) AND (Users.firstname = $1) AND (Users.surname = $2)
              `,
                [firstname, surname]
              );
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ rows}));
            
        } catch (error) {
            console.log(error)
        }
    }
    else {
        //happen error 
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
    
}


module.exports = getUsers;