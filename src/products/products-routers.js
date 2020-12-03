const path = require('path');
const express = require('express')
//const xss = require('xss')
//const debug = require('debug')('express:view')
const ProductsService = require('./products-service')

const productsRouter = express.Router()
const jsonParser = express.json()

const serialize = product => ({
    id: product.id,
    info: product.info,
    added: product.added
})

productsRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const { products } = req.body;

        if (!products) {
            return res.status(400).json({
                error: { message: `Missing 'products' in request body` }
            })
        }
        if (!Array.isArray(products)) {
            return res.status(400).json({
                error: { message: `'Products' should be an array` }
            })
        }

        ProductsService.insertProducts(
            req.app.get('db'),
            products
        )
            .then(product => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${product.id}`))
                    .json(serialize(product))
            })
            .then(res => {
                addProducts();
            })
            .catch(next)
    })

module.exports = productsRouter