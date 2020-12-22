const ProductsService = require('../services/products-service');
const productHelperMethods = require('../services/products-helper-methods');
const catalogApiService = require('../apis/catalog-api');

/**
 * 1. Get an array of images that need to added
 * 2. loop over each image and:
 *      a. post it to BigCommerce
 *      b. if successful, mark as complete
 *      c. if error, enter error in database
 */
const AddImagesService = {

    async addImages(db, next) {
        try {
            let response = await ProductsService.getNonAddedImages(db)

            return await Promise.all(response.rows.map(async data => {

                let itemData = JSON.parse(data.item_data)
                let imagesArray = itemData.items.images
                let postBody = productHelperMethods.formateImagesBody(imagesArray);
                try {
                    const response = await catalogApiService.postNewImage(postBody, data.bcitmid, next)
                    console.log(itemData.identifier)
                    await ProductsService.changeImgToAdded(db, itemData.identifier)
                }
                catch (error) {
                    next;
                }
                return "hi" //data
            }));
        } catch (error) {
            next;
        }

    }
}

module.exports = AddImagesService