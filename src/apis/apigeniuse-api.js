require('dotenv').config();
const config = require('../config')
//import TokenService from './token-service'
const fetch = require('node-fetch');

const apiGeniusApiService = {

    getItemData(upc, next) {
        
        const uri = `${config.APIGENIUS}/lookup?upc=${upc}&api_key=${process.env.APIGENIUS_API_KEY}`;

        const headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
        };

        return fetch(uri, {
            method: 'POST',
            headers: headers
        })
            .then(res => {
                res = hardData
                return res
            })
            .catch(next)
    }
}

module.exports = apiGeniusApiService