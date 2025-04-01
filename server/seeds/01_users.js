/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'huckleberry', email: 'user1@example.com', password_hash: 'hash1', id: 1},
        {username: 'holliday', email: 'user2@example.com', password_hash: 'hash2', id: 2},
        {username: 'groundhog', email: 'user3@example.com', password_hash: 'hash3', id: 3},
        {username: 'vaderman', email: 'user4@example.com', password_hash: 'hash4', id: 4},
        {username: 'irish', email: 'user5@example.com', password_hash: 'hash5', id: 5}
      ]);
    });
};

