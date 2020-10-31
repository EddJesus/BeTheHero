
//método up é responsável por realizar uma ação
exports.up = function(knex) {
  return knex.schema.createTable('ongs', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

//método down é responsável por desfazer algo que tenha sido feito
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
