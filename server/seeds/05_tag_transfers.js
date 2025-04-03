/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
  return knex('tag_transfers').del()
    .then(function () {
      return knex('tag_transfers').insert([
        {tag_id: 1, sender_id: 2, receiver_id: 1, transfer_date: new Date()},
        {tag_id: 2, sender_id: 3, receiver_id: 1, transfer_date: new Date()}
      ]);
    });
};

