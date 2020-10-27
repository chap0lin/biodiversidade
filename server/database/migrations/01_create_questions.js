module.exports = {
    async up(knex){
        return knex.schema.createTable('questions', table =>{
            table.increments('id').primary();
            table.text('question').notNullable();
            table.text('option_1').notNullable();
            table.text('option_2').notNullable();
            table.text('option_3').notNullable();
            table.text('option_4').notNullable();
            table.integer('answer').notNullable();
        })
    },
    async down(knex){
        return knex.schema.dropTable('questions')
    }  
}