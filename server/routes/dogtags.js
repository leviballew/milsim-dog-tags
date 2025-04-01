const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

router.get('/', async (req, res) => {
    try {
        const dogtags = await knex('dogtags').select('*');
        res.json(dogtags);
    } catch (error) {
        console.error('Failed to fetch dogtags:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dogtag = await knex('dogtags').where('id', id).first();
        if (dogtag) {
            res.json(dogtag);
        } else {
            res.status(404).json({ error: 'Dogtag not found' });
        }
    } catch (error) {
        console.error('Failed to fetch dogtag:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all dogtags collected by a specific user
router.get('/collected/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const dogtags = await knex('dogtags')
          .where('collector_id', userId)
          .select('*');
      if (dogtags.length) {
          res.json(dogtags);
      } else {
          res.status(404).json({ message: 'No dogtags found for this user' });
      }
  } catch (error) {
      console.error('Failed to fetch dogtags:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
