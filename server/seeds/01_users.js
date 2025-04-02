/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash sample passwords
  const hashedPasswords = await Promise.all([
    bcrypt.hash('password1', 10),
    bcrypt.hash('password2', 10),
    bcrypt.hash('password3', 10),
    bcrypt.hash('password4', 10),
    bcrypt.hash('password5', 10)
  ]);

  // Inserts seed entries with hashed passwords
  await knex('users').insert([
    { id: 1, username: 'huckleberry', email: 'user1@example.com', password: hashedPasswords[0] },
    { id: 2, username: 'holliday', email: 'user2@example.com', password: hashedPasswords[1] },
    { id: 3, username: 'groundhog', email: 'user3@example.com', password: hashedPasswords[2] },
    { id: 4, username: 'vaderman', email: 'user4@example.com', password: hashedPasswords[3] },
    { id: 5, username: 'irish', email: 'user5@example.com', password: hashedPasswords[4] }
  ]);
};
