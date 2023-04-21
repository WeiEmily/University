const multer = require('multer');
const upload = multer();
const Phone = require('../models/phoneModel');

const phoneRegex = /[A-Za-z]+_[A-Za-z0-9]+/;

//@desc Get all phones
//@route  GET /phones
//@access  Public
async function getPhones(req, res) {
    try {
        const rows = await Phone.find({});
        res.statusCode = 200;
        res.end(JSON.stringify({ rows }));
    } catch (error) {
        console.log(error);
    }

}

//@desc Get one type of phones
//@route  GET /phones/Manufacturer_Model
//@route  GET /phones/Manufacturer

//@access  Public
async function searchPhone(req, res) {
    //@route  GET /phones/Manufacturer_Model
    if (phoneRegex.test(req.url)) {
        try {
            const phoneName = req.url.split('/')[2].split('_');

            const [Manufacturer, Model] = phoneName;

            const rows = await Phone.find({ Manufacturer, Model });
            res.statusCode = 200;
            res.end(JSON.stringify({ rows }));
        } catch (error) {
            console.log(error);
        }
        //@route  GET /phones/Manufacturer
    } else if (req.url.match(/^\/phones\/[A-Za-z]+$/)) {
        const Manufacturer = req.url.split('/')[2];
        const rows = await Phone.find({ Manufacturer });
        res.statusCode = 200;
        res.end(JSON.stringify({ rows }));
    }


}

//@desc create new type of phones
//@route  POST /phones/createPhone
//@access  Public
async function createPhone(req, res) {

    try {
        upload.none()(req, res, async function (err) {

            if (err) {
                console.log(err);
                res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
                return;
            }


            const { manufacturer, model, price } = req.body;
            //check user fill in all fileds 
            if (![manufacturer, model, price].every(e => e)) {
                res.statusCode = 422;
                res.end(JSON.stringify({ message: `Please add all fields` }));
            }
            //check is it exists 
            const phoneAlreadyExists = await Phone.findOne({ Manufacturer: manufacturer, Model: model });

            if (phoneAlreadyExists) {
                //already exists 
                res.statusCode = 409;
                res.end(JSON.stringify({ message: `Phone : ${manufacturer} ${model} already exists!` }));
            } else {

                //create new phone 
                await Phone.create({
                    Manufacturer: manufacturer,
                    Model: model,
                    Price: price,
                });
                res.statusCode = 200;
                res.end(JSON.stringify({ message: `Phone : ${manufacturer} ${model} created successfully` }));
            }
        });
    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
    }

}


//@desc upadte phones deatil
//@route  PUT /phones/updatePhone
//bacause search by Manufacturer_Model so just can change price 
//@access  Public
async function updatePhone(req, res) {

    try {
        upload.none()(req, res, async function (err) {
            if (err) {
                console.log(err);
                res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
                return;
            }


            const { manufacturer, model, price } = req.body;

            if (![manufacturer, model, price].every(e => e)) {
                res.statusCode = 422;
                res.end(JSON.stringify({ message: `Please provide valid value` }));
            } else {
                const phoneAlreadyExists = await Phone.findOne({ Manufacturer: manufacturer, Model: model });
                if (!phoneAlreadyExists) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: `Phone : ${manufacturer} ${model} not found!` }));
                } else {
                    await Phone.findOneAndUpdate(
                        { Manufacturer: manufacturer, Model: model },
                        {
                            Price: price,
                        }
                    );
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: `Phone : ${manufacturer} ${model} updated successfully` }));
                }
            }

        });
    } catch (error) {
        console.log(error);
        res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
    }

}


//@desc delete   phones
//@route  DELETE /phones/Manufacturer_Model
//@route  DELTE /phones/Manufacturer
async function deletePhone(req, res) {

    if (phoneRegex.test(req.url)) {
        //delete one phone /phones/deletePhone/Manufacturer_Model
        try {
            const phoneName = req.url.split('/')[3].split('_');
            if (phoneName.length !== 2) {
                res.statusCode = 422;
                res.end(JSON.stringify({ message: `Please add all fields, Manufacturer and Model REQUIRED!` }));
            } else {
                const [Manufacturer, Model] = phoneName;

                console.log(Manufacturer, Model);
                const phone = await Phone.findOne({ Manufacturer, Model });

                if (phone) {
                    await phone.deleteOne({ Manufacturer, Model });
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: `Phone : ${Manufacturer} ${Model} deleted successfully!` }));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: `Phone : ${Manufacturer} ${Model} not found!` }));
                }
            }
        } catch (error) {
            console.log(error);
            res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
        }

        //@route  DELTE /phones/Manufacturer
    } if (req.url.match(/^\/phones\/deletePhone\/[A-Za-z]+$/)) {
        try {

            upload.none()(req, res, async function (err) {
                if (err) {
                    console.log(err);
                    res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
                    return;
                }

                const Manufacturer = req.url.split('/')[3];

                const Phones = await Phone.find({ Manufacturer: Manufacturer });

                if (Phones.length === 0) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: `Phone : ${Manufacturer} not found!` }));

                } else {
                    await Phone.deleteMany(Phone.find({ Manufacturer: Manufacturer }));
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: `Phone : ${Manufacturer} deleted successfully!` }));
                }
            });
        } catch (error) {
            console.log(error);
            res.end(JSON.stringify({ error: 'An error occurred while processing the request' }));
        }
    }
}




module.exports = {
    getPhones,
    searchPhone,
    createPhone,
    deletePhone,
    updatePhone,
};
