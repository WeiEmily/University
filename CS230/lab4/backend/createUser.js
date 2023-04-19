const getPostData = require('./utils');
const multer = require('multer');
const database = require('./db');
const upload = multer();



async function createUser(req, res) {
    if(req.url === "/users/createUser") {
        try {
            res.writeHead(200, { "Content-Type": "application/json" });

            upload.none()(req, res, async function (err) {
                if (err) {
                    console.log(err);
                    res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
                    return;
                }

                const title = req.body.title;
                const firstname = req.body.firstname;
                const surname = req.body.surname;
                const mobile = req.body.mobile;
                const email = req.body.email;
                const address1 = req.body.address_line_1;
                const address2 = req.body.address_line_2;
                const town = req.body.town;
                const city = req.body.county_city;
                const eircode = req.body.eircode;

                // Insert data into USERS table and get id
                const userResult = await database.client.query(`
                    INSERT INTO USERS(title, firstname, surname, mobile, email) 
                    VALUES ($1 ,$2 ,$3, $4, $5)
                    RETURNING id;
                `, [title, firstname, surname, mobile, email]);

                const userId = userResult.rows[0].id;

                // Insert data into SHIPPING_ADDRESS table and get addressid
                const addressResult = await database.client.query(`
                    INSERT INTO SHIPPING_ADDRESS(address_line_1, address_line_2, town, county_city, eircode) 
                    VALUES ($1 ,$2 ,$3, $4, $5)
                    RETURNING addressid;
                `, [address1, address2, town, city, eircode]);

                const addressId = addressResult.rows[0].addressid;

                // Insert data into users_info table with userId and addressId
                await database.client.query(`
                    INSERT INTO users_info (id,addressid) VALUES ( $1, $2);
                `, [userId, addressId]);

                res.end(JSON.stringify({ message: `UserID :  ${userId} created successfully` }));
            });
            
        } catch (error) {
            console.log(error);
            res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
        }
    }
}

module.exports = createUser;
