const ProductsService = {
    insertProduct(knex, newProduct) {
        return knex
            .insert({info: newProduct})
            .into('products')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getFirstNonAdded(knex) {
        return knex.from('products').select('*').where('added', false).first()
    },

    /*deleteProduct(knex, id) {
        return knex('products')
            .where({ id })
            .delete()
    },*/

    changeToAdded(knex, id) {
        return knex('products')
            .where({ id })
            .update({ added: true })
    },
}

module.exports = ProductsService