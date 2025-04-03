/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('requests').del();

  // Insert 4 pending requests from user 1 to users 2, 3, 4, 5
  await knex('requests').insert([
    { id: 1, senderId: 1, recipientId: 4,pending: true, accepted: false, denied: false }
  ]);
};
