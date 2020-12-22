const knex = require('knex');

let db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
});

const ProductsService = {
    insertProducts(knex, products) {
        return knex
            .insert(products)
            .into('products')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getNonAddedProducts(knex) {
        return knex.raw(`select * from products where itemAdded=false;`)
    },
    getNonAddedImages(knex) {
        return knex.raw(`select * from products where itemadded=true AND imgadded=false;`)
    },
    changeToAddedAddID(db, upc, bigcommerce_id) {
        return db('products')
            .where({ upc })
            .update({itemadded: true, bcitmid: bigcommerce_id })
    },
    changeImgToAdded(db, upc) {
        return db('products')
            .where({ upc })
            .update({imgadded: true})
    },
}

module.exports = ProductsService