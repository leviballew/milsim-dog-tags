const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/auth');

router.get('/searchUsers', authenticateToken, async (req, res) => {
  const { userId, searchTerm } = req.query;

  try {
    let query = knex('users')
      .select('id', 'username', 'email')
      .whereNot('id', userId);

    if (searchTerm) {
      query = query.andWhere('username', 'like', `%${searchTerm}%`);
    }

    const users = await query;
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await knex('users')
      .select('id', 'username', 'email') // Select only the username and email fields
      .where({ id })
      .first();
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

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knex('users').select('*').where({ username }).first();

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, id: user.id });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
