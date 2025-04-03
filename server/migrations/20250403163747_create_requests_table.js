/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('requests', (table) => {
    table.increments('id').primary();
    table.integer('senderId').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('recipientId').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.boolean('pending').defaultTo(true);
    table.boolean('accepted').defaultTo(false);
    table.boolean('denied').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('requests');
};
