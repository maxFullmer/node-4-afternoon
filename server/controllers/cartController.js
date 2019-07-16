const swag = require('../models/swag.js');

module.exports = {
    add: (req, res, next) => {
        const {user} = req.session;
        const {id} = req.params;
        
        const index = user.cart.findIndex(swag => swag.id == id);

        if (index === -1) {
            const selectedSwag =  swag.find(swag => swag.id == id);

            user.cart.push(selectedSwag);
            user.total += selectedSwag.price;
        }

        res.status(200).send(user);
    },

    delete: (req, res, next) => {
        const {user} = req.session;
        const {id} = req.params;

        const index = user.cart.findIndex(swag => swag.id == id);
        const selectedSwag =  swag.find(swag => swag.id == id);

        if (index !== -1) {
            user.cart.splice(index, 1);
            user.total -= selectedSwag.price;
        }

        res.status(200).send(user);
    },
    checkout: (req, res, next) => {
        const {user} = req.session;
        user.cart = [];
        user.total = 0;

        res.status(200).send(user)
    }
}