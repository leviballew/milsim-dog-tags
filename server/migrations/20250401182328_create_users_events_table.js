/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users_events', function(table) {
    table.integer('user_id').unsigned().notNullable();
    table.integer('event_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');
    table.primary(['user_id', 'event_id']); // Composite primary key
    table.timestamps(true, true); // Creates created_at and updated_at columns automatically
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users_events');
};
