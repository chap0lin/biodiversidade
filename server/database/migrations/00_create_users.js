module.exports = {
    async up(knex){
        return knex.schema.createTable('users', table =>{
            table.increments('id').primary();
            table.string('login').notNullable();
            table.string('password').notNullable();
            table.integer('points_t').defaultTo(0).notNullable();
            table.integer('points_m').defaultTo(0).notNullable();
            table.integer('points_w').defaultTo(0).notNullable();
        })
    },
    async down(knex){
        return knex.schema.dropTable('users')
    }  
}