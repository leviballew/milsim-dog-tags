/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([
        {name: 'Atlantic Front 2', location: 'Black Ops', date: '2025-03-15', description: 'Annual match gathering teams from various regions.', id: 1},
        {name: 'Atlantic Front 1', location: 'Black Ops', date: '2024-02-23', description: 'Competitive tournament with prizes.', id: 2},
        {name: 'Weekend Skirmish', location: 'No Location', date: '2024-02-23', description: 'Weekend event with no location.', id: 999}
      ]);
    });
};
