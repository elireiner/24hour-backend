const knex = require('knex');
const app = require('../app');

let db;

db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
});

app.set('db', db)

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

    /*deleteProduct(knex, id) {
        return knex('products')
            .where({ id })
            .delete()
    },*/

    changeToAdded(db, id) {
        return knex('products')
            .where({ id })
            .update({ added: true })
    },
}

module.exports = ProductsService