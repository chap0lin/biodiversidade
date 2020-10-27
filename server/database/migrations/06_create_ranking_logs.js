module.exports = {
    async up(knex){
        return knex.schema.createTable('ranking_logs', table =>{
            table.increments('id').primary();
            table.string('ranking').notNullable();
            table.timestamp('generated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
        })
    },
    async down(knex){
        return knex.schema.dropTable('ranking_logs')
    }  
}