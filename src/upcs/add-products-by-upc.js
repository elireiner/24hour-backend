const apiGeniusApiService = require('../apis/apigeniuse-api');
//const hardData = require('./hard-data')
const upcHelperMethods = require('./upc-helper-methods')

const AddByUpcService = {
    addProducts(hardData) {
        const extractedData = upcHelperMethods.extractData(hardData)
        return extractedData

        /*const productsToAdd = ProductsService.getNonAddedProducts()
     
       apiGeniusApiService.getItemData(upc, next)
        .then(res => {
        console.log(res)
        })
        .catch(next)*/
    }
}

module.exports = AddByUpcService