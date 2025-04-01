/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tag_transfers', function(table) {
    table.increments('id').primary();
    table.integer('tag_id').unsigned().notNullable();
    table.integer('sender_id').unsigned().notNullable();
    table.integer('receiver_id').unsigned().notNullable();
    table.foreign('tag_id').references('id').inTable('dogtags').onDelete('CASCADE');
    table.foreign('sender_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('receiver_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('transfer_date').defaultTo(knex.fn.now());
    table.timestamps(true, true); // Creates created_at and updated_at columns automatically
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tag_transfers');
};
