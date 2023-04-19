const database = require('./db');

//@desc Delete a user

async function deleteUser(req, res) {
    if(req.url === "/deleteUser") {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({message: 'please select which one need delete'}))
    
       
    }else if(req.url.match(/\users\/deleteUser\/([0-9]+)/)){

         try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete data from postgreSQL
            await database.client.query(
            `DELETE FROM USERS WHERE id = $1;`,[id]);

            // delete others table information 
            await database.client.query(`DELETE FROM SHIPPING_ADDRESS WHERE addressid IN (SELECT addressid FROM users_info WHERE id = $1);`,[id]);

            // delete middle table information
            await database.client.query(`DELETE FROM users_info WHERE id = $1;`,[id]);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ rowCount}));
            
        } catch (error) {
            console.log(error)
        }
    }else {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({message: 'Route Not Found'}))
    }
    
}

module.exports = deleteUser;

