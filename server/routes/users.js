const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

router.get('/', async (req, res) => {
  try {
    const users = await knex('users').select('*');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await knex('users').select('*').where({ id }).first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
