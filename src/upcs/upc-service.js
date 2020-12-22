const UpcsService = {
    getAllUpcs(knex) {
        return knex
            .from('upcs')
            .select()
    },

    insertUpcAndData(knex, upc, data) {
       console.log(upc)
        return knex
            .insert({upc: upc, item_data: data})
            .into('products')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    insertBigCommerce(knex, item, image) {
        return knex
            .insert({BigCommerceItemBody: item, BCImageBody: image})
            .into('products')
            .returning('*')
            .then(rows => {
                console.log(rows[0])
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('upcs').select('*').where('upc_id', id).first()
    },

    getByEmail(knex, email) {
        return knex.from('upcs').select('upc_id').where('email', email).first()
    },

    deleteUpc(knex, id) {
        return knex('upcs')
            .where({  'upc_id': id })
            .delete()
            .then()
    },

    deleteAllUpcs(knex) {
        return knex('upcs')
            .delete()
            .then(res => {
                db.raw(`ALTER SEQUENCE upcs minvalue 0 START WITH 1`)
            })
    },

    updateUpc(knex, id, newUpcFields) {
        return knex('upcs')
            .where({ 'upc_id': id  })
            .update(newUpcFields)
    },
}

module.exports = UpcsService