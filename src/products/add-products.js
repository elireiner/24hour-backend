const ProductsService = require('../services/products-service');
const productHelperMethods = require('../services/products-helper-methods');
const catalogApiService = require('../apis/catalog-api');

/**
 * 1. Get an array of products that need to added
 * 2. loop over each product and:
 *      a. post it to BigCommerce
 *      b. if successful, mark as complete
 *      c. if error, enter error in database
 */
const AddProductsService = {

   async addProducts(db, next) {
      try {
         const response = await ProductsService.getNonAddedProducts(db)
         return await Promise.all(response.rows.map(async data => {

            let itemData = JSON.parse(data.item_data)
            let postBody = productHelperMethods.formatItemBody(itemData);

            try {
               const response = await catalogApiService.postNewItem(postBody, next)

               await ProductsService.changeToAddedAddID(db, response.data.upc, response.data.id)
            }
            catch (error) {
               next;
            }
            return data
         }));
      } catch (error) {
         next;
      }

   }
}

module.exports = AddProductsService