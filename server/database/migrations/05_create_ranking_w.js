module.exports = {
    async up(knex){
        return knex.schema.createTable('ranking_w', table =>{
            table.increments('id').primary();
            table.integer('id_user').notNullable().references('id').inTable('users');
            table.integer('points').notNullable().references('points_w').inTable('users');
        })
    },
    async down(knex){
        return knex.schema.dropTable('ranking_w')
    }  
}