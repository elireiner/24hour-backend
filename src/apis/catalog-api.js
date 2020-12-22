require('dotenv').config();
const config = require('../config');
const fetch = require('node-fetch');

const catalogApiService = {
    postNewItem(itemData, next) {
        const uri = `${config.BIG_COMMERCE}/catalog/products`;

        const headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
            'x-auth-token': `${process.env.BIGCOMMERCE_TOKEN}`
        };

        return fetch(uri, {
            method: 'POST',
            headers: headers,
            body: itemData,
        })
            .then(res => {
                return res.json()
            })
            .catch(next)
    },
    postNewImage(itemData, id, next) {
        const uri = `${config.BIG_COMMERCE}/catalog/products/${id}/images`;

        const headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
            'x-auth-token': `${process.env.BIGCOMMERCE_TOKEN}`
        };

        return fetch(uri, {
            method: 'POST',
            headers: headers,
            body: itemData,
        })
            .then(res => {
                return res.json()
            })
            .catch(next)
    },
}

module.exports = catalogApiService
