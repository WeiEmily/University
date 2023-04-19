This is assigment 5 of CS230

# below just my note 
1. npm init
2. npm install mongodb                : instal mongoose
3. npm install --save-dev nodemon      : automatically effect when I did any change restarting the node application
   # must change scripts in Json files :"dev": "nodemon app.js"
4. npm install dotenv --save          : .envs
5. npm install cors                   : enable CORS for a Node.js application




refer :https://github.com/bradtraversy/mern-tutorial/tree/main/frontend/src

refer: https://github.com/bradtraversy/vanilla-node-rest-api



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
http://localhost:5000/users
-----------------------------------------------------

GET
search user by email
http://localhost:5000/users/rwhittington0@oracle.com
-----------------------------------------------------

GET
search user by name
http://localhost:5000/users/Michaella_Farncomb
-----------------------------------------------------

GET
show all phones
http://localhost:5000/phones
-----------------------------------------------------

GET
search phone by Manufacturer_Model
http://localhost:5000/phones/Apple_iPhone14
-----------------------------------------------------

GET
search phone by Manufacturer
http://localhost:5000/phones/Apple
-----------------------------------------------------

GET
get all orders
http://localhost:5000/orders
-----------------------------------------------------

=====================================================

### POST

POST
create new user
http://localhost:5000/users/createUser

Bodyform-data: 
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
http://localhost:5000/orders/createOrder

Bodyform-data: 
user  642d9093ce467858b34280d9

text  I bought mate15

phone  64380851aa3d12e8878bc3ee
-----------------------------------------------------

POST
create Phone
http://localhost:5000/phones/createPhone

Bodyform-data: 
manufacturer  huawei
model  meta14
price  1500
-----------------------------------------------------

=====================================================

### PUT


PUT
add user's adddress
http://localhost:5000/users/updateUser/addAddress?_id=6431611aa4707ebad2ffeff7&address_line1=524 Melody Lane&address_line2=Apt 651&town=Mthatha&city=PodolÃ­&eircode=MBG
Query Params: 
_id  6431611aa4707ebad2ffeff7
address_line1  524 Melody Lane
address_line2  Apt 651
town  Mthatha
city  PodolÃ­
eircode  MBG
-----------------------------------------------------

PUT
remove user's address
http://localhost:5000/users/updateUser/removeAddress?_id=6431611aa4707ebad2ffeff7&address_id=643bd1af42a9726b99a0c941
_id  6431611aa4707ebad2ffeff7
address_id  643bd1af42a9726b99a0c941
-----------------------------------------------------

PUT
UpdateUser's information
http://localhost:5000/user/updateUser

Bodyform-data:
_id  642d8edbce467858b34280d5

title  Mr

firstname  Ran

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
http://localhost:5000/phones/updatePhone

Bodyform-data: 
manufacturer  Apple

model  iPhone14Pro

price  5555
-----------------------------------------------------
PUT
add new phone in Phone list
http://localhost:5000/orders/updateOrder/add/64303c47dd4c74f59d1e6442

Body form-data:
_id  64380f3358dadf44e294df64

text  I bought Apple

phone  64303c47dd4c74f59d1e6442
-----------------------------------------------------

PUT
remove phone form phone list
http://localhost:5000/orders/updateOrder/remove/64303c47dd4c74f59d1e6442?_id=64380f3358dadf44e294df64

Query Params
_id  64380f3358dadf44e294df64
-----------------------------------------------------

PUT update order
http://localhost:5000/orders/updateOrder
Body form-data:
_id  64380f3358dadf44e294df64

text  I bought Apple14

phone  64303c47dd4c74f59d1e6442
-----------------------------------------------------
=====================================================

### DELETE

DELETE
delete user by email
http://localhost:5000/users/deleteUser/mfarncombh@livejournal.com
-----------------------------------------------------

DELETE delte order
http://localhost:5000/orders/deleteOrder/643c41cd5043edc46226bd0a
-----------------------------------------------------

DELETE delete Manufacturer
http://localhost:5000/phones/deletePhone/Huawei

/phones/deletePhone/Manufacturer
-----------------------------------------------------

DELETE
delete one phone
http://localhost:5000/phones/deletePhone/Oppo_one123

/phones/deletePhone/Manufacturer_Model
-----------------------------------------------------
