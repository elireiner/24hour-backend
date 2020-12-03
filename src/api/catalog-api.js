require('dotenv').config();
const config = require('../config')
//import TokenService from './token-service'
const fetch = require('node-fetch');

const catalogApiService = {
    postNewItem(itemData, next) {
        return 'hi'
        /* const uri = `${config.BIG_COMMERCE}/catalog/products`;
 
         const headers = {
             'content-type': 'application/json',
             'accept': 'application/json',
             'x-auth-token': `${process.env.x-auth-token}`
         };
 
         return fetch(uri, {
             method: 'POST',
             body: itemData,
             headers: headers
         })
             .then(res => {
                 console.log(res)
                 return res
             })
             .catch(next)*/
    }
}

module.exports = catalogApiService
