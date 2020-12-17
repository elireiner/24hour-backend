const path = require('path');
const express = require('express');
const apiGeniusApiService = require('../apis/apigeniuse-api')
const AddByUpcService = require('./add-products-by-upc')
//const xss = require('xss')
//const debug = require('debug')('express:view')
//const UpcsService = require('./upcs-service');
//const AddUpcsService = require('./add-upcs')

const upcsRouter = express.Router()
const jsonParser = express.json()

const serialize = upc => ({
    id: upc.id,
    info: upc.info,
    added: upc.added
})

upcsRouter
    .route('/hard-data')
    .post(jsonParser, (req, res, next) => {
        console.log(req.body.data)
        apiGeniusApiService.getItemData(req.body.data, next)
            .then(async response => {
                const resData = await AddByUpcService.addProducts(response)
                res.status(201).json(resData)
            })
            .catch(next)
        //  const resData = await AddByUpcService.addProducts(hardData)
    })

upcsRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { data } = req.body;
        const resData = data.map(upc => {
            return AddByUpcService.addProducts(upc)
        })

        res.status(201).json(resData)
        /* if (!upcs) {
             return res.status(400).json({
                 error: { message: `Missing 'upcs' in request body` }
             })
         }
         if (!Array.isArray(upcs)) {
             return res.status(400).json({
                 error: { message: `'Upcs' should be an array` }
             })
         }
 
         UpcsService.insertUpcs(
             req.app.get('db'),
             upcs
         )
             .then(async upc => {
                 await AddUpcsService.addUpcs();
                 res
                     .status(201)
                     .location(path.posix.join(req.originalUrl, `/${upc.id}`))
                     .json(serialize(upc))
             })
             .catch(next)*/
    })

module.exports = upcsRouter