const upcHelperMethods = {
    extractData(hardData) {
        //remove text and spaces
        const extractWeight = hardData.items.weight.replace(/[^0-9.]/g, '');
        //if there is no weight, set to zero
        const finalWeight = (extractWeight.length < 1) ? 0 : extractWeight;

        let brand_id = 0
        if (hardData.items.brand === "Elkay" || hardData.items.brand === "ELKAY RESIDENTIAL") {
            brand_id = 63
        }

        if (hardData.items.brand === "Delta") {
            brand_id = 52
        }

        let category = hardData.items.category;
        if (category === "Hardware > Plumbing > Plumbing Fixtures > Sinks" ||
            category === "Hardware > Plumbing > Plumbing Fixtures > Sinks > Kitchen & Utility Sinks" ||
            category === "Hardware > Plumbing > Plumbing Fixtures > Faucets" ||
            category === "Hardware > Plumbing > Plumbing Fixtures" ||
            category === "Hardware > Plumbing > Plumbing Fittings & Supports > Plumbing Valves" ||
            category === "Home & Garden > Decor > Window Treatment Accessories > Curtain & Drape Rods") {
            category = null
        }

        let sellers = [];
        let topPrice = 0;
        let walmartPrice = 0;
        let buildPrice = 0;
        let ourPrice;
        hardData.items.pricing.forEach(itm => {
            //we are selling new products so we need to compare our price to sellers that also sell new ones
            if (itm.condition === "New") {
                //Let's save only the information we need
                seller = {
                    "seller": itm.seller,
                    "website_name": itm.website_name,
                    "currency": itm.currency,
                    "price": itm.price,
                    "shipping": itm.shipping,
                    "date_found": itm.date_found
                }
                //Now let's add the new seller object to our sellers array
                sellers.push(seller)
                //Let's also get the top seller price. We will use this a fallback option
                if (itm.price > topPrice) {
                    topPrice = itm.price
                }
                //Let's get walmart's price when they are the seller.
                if (itm.website_name === "walmart.com") {
                    if (itm.price > walmartPrice) {
                        walmartPrice = itm.price
                    }
                }
console.log(buildPrice)
                //Let's get walmart's price when they are the seller.
                if (itm.website_name === "build.com") {
                    console
                    if (itm.price > buildPrice) {
                        buildPrice = itm.price
                    }
                }
            }
        })

        if (category === null && buildPrice > 0) {
            ourPrice = buildPrice
        }
        else if (category !== null && walmartPrice > 0) {
            ourPrice = walmartPrice
        }
        else {
            ourPrice = topPrice
        }

        let imagesArray = hardData.items.images
        let topImages = [];
        //images from these retailers are usually great
        imagesArray.forEach(img => {
            if (img.includes('lowes') || img.includes('walmartimages') || img.includes('homedepot')) {
                topImages.push(img)
            }
        })
        //If we found top images, use them
        imagesArray = (topImages.length > 0) ? topImages : imagesArray;
        //Add format for bigcommerce
        imagesArray = imagesArray.map(image => {
            return { "image_url": image }
        })
        //we don't need more than two images
        imagesArray.splice(1);

        const extractedData = {
            "name": hardData.items.title,
            "description": hardData.items.description,
            "upc": hardData.items.upc,
            "mpn": hardData.items.mpn,
            "ean": hardData.items.ean,
            "brand_name": hardData.items.brand,
            "brand_id": brand_id,
            "weight": `${finalWeight}`,
            "color": hardData.items.color,
            "price": ourPrice,
            "category": category,
            "categories": [
                71
            ],
            "type": "physical",
            "images": imagesArray
        }

        if (extractedData.category === null) {
            delete extractedData.category;
        }

        return extractedData

        /*const productsToAdd = ProductsService.getNonAddedProducts()
     
       apiGeniusApiService.getItemData(upc, next)
        .then(res => {
        console.log(res)
        })
        .catch(next)*/
    }
}

module.exports = upcHelperMethods