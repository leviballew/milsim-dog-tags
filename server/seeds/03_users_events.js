/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
  return knex('users_events').del()
    .then(function () {
      return knex('users_events').insert([
        {user_id: 1, event_id: 1},
        {user_id: 2, event_id: 1},
        {user_id: 3, event_id: 1},
        {user_id: 4, event_id: 1},
        {user_id: 5, event_id: 1},
        {user_id: 1, event_id: 2},
        {user_id: 2, event_id: 2},
        {user_id: 3, event_id: 2},
        {user_id: 4, event_id: 2},
        {user_id: 5, event_id: 2}
      ]);
    });
};
