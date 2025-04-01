/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
  return knex('dogtags').del()
    .then(function () {
      return knex('dogtags').insert([
        {owner_id: 1, collector_id: 2, event_id: 1},
        {owner_id: 2, collector_id: 3, event_id: 1}
      ]);
    });
};

