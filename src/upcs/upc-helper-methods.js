const upcHelperMethods = {
    extractData(hardData) {

        const extractWeight = hardData.items.weight.replace(/[^0-9.]/g, '');
        const finalWeight = (extractWeight.length < 1) ? 0 : extractWeight

        const imagesArray = hardData.items.images.map(image => {
            return {"image_url": image}
          })
          
        const extractData = {
            "name": hardData.items.title,
            "description": hardData.items.description,
            "upc": hardData.items.upc,
            "brand": hardData.items.brand,
            "weight": `${finalWeight}`,
            "color": hardData.items.color,
            "price": hardData.items.highest_price,
            "categories": [
                71
            ],
            "type": "physical",
            "images": imagesArray
        }
        return extractData

        /*const productsToAdd = ProductsService.getNonAddedProducts()
     
       apiGeniusApiService.getItemData(upc, next)
        .then(res => {
        console.log(res)
        })
        .catch(next)*/
    }
}

module.exports = upcHelperMethods