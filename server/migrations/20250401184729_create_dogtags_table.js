/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('dogtags', function(table) {
    table.increments('id').primary();
    table.integer('giver_id').unsigned().notNullable();
    table.integer('collector_id').unsigned();
    table.integer('event_id').unsigned();
    table.foreign('giver_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('collector_id').references('id').inTable('users').onDelete('SET NULL');
    table.foreign('event_id').references('id').inTable('events').onDelete('SET NULL');
    table.timestamps(true, true); // Creates created_at and updated_at columns automatically
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('dogtags');
};