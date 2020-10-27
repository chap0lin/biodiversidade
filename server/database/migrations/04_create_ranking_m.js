module.exports = {
    async up(knex){
        return knex.schema.createTable('ranking_m', table =>{
            table.increments('id').primary();
            table.integer('id_user').notNullable().references('id').inTable('users');
            table.integer('points').notNullable().references('points_m').inTable('users');
        })
    },
    async down(knex){
        return knex.schema.dropTable('ranking_m')
    }  
}