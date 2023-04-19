const database = require('./db');
const multer = require('multer');
const upload = multer();

//@desc Update an existing user
async function updateUser(req, res) {
  if (req.url === '/users/updateUser') {
    try {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      // use multer parse formData data
      upload.none()(req, res, async function (err) {
        if (err) {
          console.log(err);
          res.end(
            JSON.stringify({
              error: 'An error occurred while processing the request',
            })
          );
          return;
        }

        // get data from request 
        const id = req.body.id;
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

        // update in PostgreSQL batabase
        await database.client.query(
          `
          UPDATE USERS
          SET title = $1, firstname = $2, surname = $3, mobile = $4, email = $5
          WHERE id = $6;
        `,
          [title, firstname, surname, mobile, email, id]
        );

        await database.client.query(
          `
          UPDATE SHIPPING_ADDRESS
          SET address_line_1 = $1, address_line_2 = $2, town = $3, county_city = $4, eircode = $5
          WHERE addressid = (
            SELECT addressid
            FROM users_info
            WHERE id = $6
          );
        `,
          [address1, address2, town, city, eircode, id]
        );

        res.end(JSON.stringify({ message: `User ID: ${id} updated successfully` }));
      });
    } catch (error) {
      console.log(error);
      res.end(JSON.stringify({ error: "An error occurred while processing the request" }));
    }
  }
}

module.exports = updateUser;
