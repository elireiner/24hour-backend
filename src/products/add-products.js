import ProductsService from "./products-service"
const ProductsService = require('./products-service')

/**
 * 1. Get an array of products that need to added
 * 2. loop over each product and:
 *      a. post it to BigCommerce
 *      b. if successful, mark as complete
 *      c. if error, enter error in database
 */
export async function addProducts(db) {
   console.log('I ran')
   const productsToAdd = ProductsService.getNonAddedProducts()
   
  await productsToAdd.map((product) => {
    ProductsService.changeToAdded(db, product.id)
   })
   console.log(ProductsService.getNonAddedProducts())
}