This is assigment 6 of CS230

# below just my note 
1. npm init
2. npm install mongodb                : instal mongoose
3. npm install --save-dev nodemon      : automatically effect when I did any change restarting the node application
   # must change scripts in Json files :"dev": "nodemon app.js"
4. npm install dotenv --save          : .envs
5. npm install cors                   : enable CORS for a Node.js application
6. npm i express                      : install express
7. npm install express-async-handler  : install middleware ...

# Here's a brief description for the database design:

I designed three schemas: User, Order, and Phone. Since I considered the possibility of needing to view Phone data separately, I created a schema for Phone. However, since the Address data is entirely dependent on the existence of User, I treated Address as an array within the User schema. If necessary, a separate schema for Address could be created. Each data has operations for GET, POST, PUT, and DELETE. When creating or deleting orders, I called the userAddOrder and userDeleteOrder functions in the User controller to simultaneously remove the corresponding order under the User schema.


refer :https://github.com/bradtraversy/mern-tutorial/tree/main/frontend/src



# API documentation

### example
|-------method-------|
|----description-----|
|--------url---------|
|-----form datat-----|

## assignment5

### GET

GET
Get all users
http://localhost:5000/api/users/
-----------------------------------------------------

GET
search user by email

http://localhost:5000/api/users/email?email=jludlem1@vkontkte.ru

-----------------------------------------------------

GET
search user by name
http://localhost:5000/api/users/name?firstname=Ran&surname=ZhuZhu
-----------------------------------------------------

GET
show all phones
http://localhost:5000/api/phones
-----------------------------------------------------

GET
search phone by Manufacturer_Model
http://localhost:5000/api/phones/model?Manufacturer=Huawei&Model=mate12
-----------------------------------------------------

GET
search phone by Manufacturer
http://localhost:5000/api/phones/manufacturer?Manufacturer=Huawei
-----------------------------------------------------

GET
get all orders
http://localhost:5000/api/orders/createOrder
-----------------------------------------------------

=====================================================

### POST

POST
create new user
http://localhost:5000/api/users/createUser

Body urlencoded
title  Mrs

firstname  Michaella

surname  Farncomb

mobile  956-762-1778

email  mfarncombh@livejournal.com

address_line1  29 International Parkway

address_line2  Suite 67

town  KoÃ­misi

city  Karonga

eircode  OCA
-----------------------------------------------------

POST
create new order
http://localhost:5000/api/orders/createOrder

Body urlencoded 
user  64427bef949e0d721540a48c

text  bought Apple v
phone  64380851aa3d12e8878bc3ee
-----------------------------------------------------

POST
create Phone
http://localhost:5000/api/phones/createPhone

Body urlencoded
manufacturer  Oppo
model  one
price  2345
-----------------------------------------------------

=====================================================

### PUT


PUT
add user's adddress

http://localhost:5000/api/users/addAddress?_id=64426c37f9ef4493f1009d66

Body urlencoded
_id  6431611aa4707ebad2ffeff7
address_line1  524 Melody Lane
address_line2  Apt 651
town  Mthatha
city  PodolÃ­
eircode  MBG
-----------------------------------------------------

PUT
remove user's address

http://localhost:5000/api/users/removeAddress?_id=64426c37f9ef4493f1009d66&address=6442777fc6e9f9414f6c42e2
-----------------------------------------------------

PUT
UpdateUser's information
http://localhost:5000/api/users/updateUser?_id=64426c37f9ef4493f1009d66

Query Params
_id  64426c37f9ef4493f1009d66

title  Mr

firstname  Chrissy w

surname  ZhuZhu

mobile  054321

email  ran_zhu@mail.com

address_line1  chengdy

address_line2  45676543

town  cheng

city  sichu

eircode  ertysa
-----------------------------------------------------

PUT
update Phone list
http://localhost:5000/api/phones/updatePhone?_id=6442c7f4e3702dcb7ee1774e

Bodyurlencoded
price  5555

-----------------------------------------------------

PUT update order
http://localhost:5000/api/orders/updateOrder?_id=6442ee730b8164c7e0930f70

Body urlencoded:

text  bought Apple iphone 14 Plus

phone  64303e9a84f066611e5e00f7
-----------------------------------------------------
=====================================================

### DELETE

DELETE
delete user by id
http://localhost:5000/api/users/removeUser?_id=64426c37f9ef4493f1009d66
-----------------------------------------------------

DELETE delte order
http://localhost:5000/api/orders/deleteOrder?_id=6442ee08471c26f3870fffc9
-----------------------------------------------------

DELETE
delete one phone
http://localhost:5000/api/phones/deletePhone?_id=6442c7f4e3702dcb7ee1774e

-----------------------------------------------------
