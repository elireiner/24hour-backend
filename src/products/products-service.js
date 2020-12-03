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
        return knex.raw(`select * from products where added=false;`)
    },

    changeToAdded(id) {
        return db('products')
            .where({ id })
            .update({ added: true })
    },
}

module.exports = ProductsService