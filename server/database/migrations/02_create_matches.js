module.exports = {
    async up(knex){
        return knex.schema.createTable('matches', table =>{
            table.increments('id').primary();
            table.integer('id_user1').notNullable().references('id').inTable('users');
            table.integer('id_user2').notNullable().references('id').inTable('users');
            table.integer('points_1').notNullable();
            table.integer('points_2').notNullable();
            table.integer('winner').notNullable().references('id').inTable('users');
            table.timestamp('inserted_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
        })
    },
    async down(knex){
        return knex.schema.dropTable('matches')
    }  
}