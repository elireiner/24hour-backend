const path = require('path');
const express = require('express')
//const xss = require('xss')
//const debug = require('debug')('express:view')
const ProductsService = require('../services/products-service');
const AddImagesService = require('./add-images')

const imagesRouter = express.Router()
const jsonParser = express.json()

imagesRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      let ids = await AddImagesService.addImages(req.app.get('db'), next);
      console.log(ids)
      return res.status(200).json({ "Items Added": ids })
    } catch (error) {
      return res.status(400).end();
    }
  })

module.exports = imagesRouter