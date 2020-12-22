const apiGeniusApiService = require('../apis/apigeniuse-api');
const UpcsService = require('./upc-service');

const AddByUpcService = {
    addProducts(upcsArray, db, next) {

        return Promise.all(upcsArray.reduce((acc, el) => {
            acc = acc.concat(apiGeniusApiService.getItemData(el, next))
            return acc
        }, []))
            .then((response) => {
    
                let successful = response.filter(itm => itm.success)
                let successfulUPCS = successful.map(itm => Number(itm.items.upc))
                let unsuccessful = upcsArray.filter(upc => !successfulUPCS.includes(Number(upc)))
                return Promise.all(successful.reduce((acc, el) => {
                    acc = acc.concat(UpcsService.insertUpcAndData(db, Number(el.items.upc), el))
                    return acc
                }, []))
                    .then(response => {
                       let addedUpcs = response.map(item => {
                            return item.upc
                        })
                       return {"Success!": {addedUpcs}, "unsuccessful": {unsuccessful}}
                    })
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = AddByUpcService