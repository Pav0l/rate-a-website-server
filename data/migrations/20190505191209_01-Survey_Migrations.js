exports.up = knex =>
  knex.schema.createTable('survey', table => {
    table.uuid('id');
    table.string('url').notNullable();
    table.integer('rating').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('survey');
