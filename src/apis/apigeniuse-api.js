require('dotenv').config();
const config = require('../config')
const fetch = require('node-fetch');

const apiGeniusApiService = {

    getItemData(upc, next) {
        
        const uri = `${config.APIGENIUS}/lookup?upc=${upc}`;

        const headers = {
            'content-type': 'application/json',
            'accept': 'application/json',
            "ApiGenius_API_Key": `ebe33c0bc4c24501bb2e3a34c7022ee9`
        };

        return fetch(uri,{
            headers: headers
        })
            .then(async res => {
                res = await res.json()
                return res
            })
            .catch(next)
    }
}

module.exports = apiGeniusApiService