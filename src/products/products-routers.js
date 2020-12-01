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

        products.map(newProduct => {
            ProductsService.insertProduct(
                req.app.get('db'),
                newProduct
            )
        })

            .then(product => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${product.id}`))
                    .json(serialize(product))
            })
            .catch(next)
    })

/*productsRouter
    .route('/product/:product_id')
    .all((req, res, next) => {
        ProductsService.getById(
            req.app.get('db'),
            req.params.product_id
        )
            .then(product => {
                if (!product) {
                    return res.status(404).json({
                        error: { message: `Product does not exist` }
                    })
                }
                res.product = product;
                next()
            })
            .catch(next)

    })
    .get((req, res, next) => {
        res.json({
            id: res.product.id,
            product_name: xss(res.product_name), // sanitize title
        })
    })
    .delete(jsonParser, (req, res, next) => {
        ProductsService.deleteProduct(req.app.get('db'),
            req.params.product_id)
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { product_name } = req.body;
        const productToUpdate = { product_name }

     
        if (!product_name) {
            return res.status(400).json({
                error: {message: `Request body must contain a product_name `}
            })
        }
        
        ProductsService.updateProduct(
            req.app.get('db'),
            req.params.product_id,
            productToUpdate
        )

            .then(numRowsAffected => {
                res.status(204).end()
            })

            .catch(next)
    })*/

module.exports = productsRouter