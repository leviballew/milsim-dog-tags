const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);
const authenticateToken = require('../middleware/auth');
const DEFAULT_EVENT_ID = 999;


router.post('/', authenticateToken, async (req, res) => {
    const { recipientId } = req.body;
    const senderId = req.user.id;

    try {
        await knex('requests').insert({ senderId, recipientId });
        res.status(201).json({ message: 'Request sent successfully' });
    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const { userId } = req.query;

    try {
        const requests = await knex('requests')
            .join('users', 'requests.senderId', 'users.id')
            .select('requests.id', 'users.username as senderUsername')
            .where('requests.recipientId', userId);
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:id/release', authenticateToken, async (req, res) => {
  const requestId = req.params.id;
  console.log('🔥 Releasing dogtags for request:', requestId);

  try {
    const request = await knex('requests').where({ id: requestId }).first();
    console.log('✅ Request found:', request);

    if (!request) {
      console.log('❌ Request not found');
      return res.status(404).json({ error: 'Request not found' });
    }

    await knex('requests').where({ id: requestId }).update({
      pending: false,
      accepted: true,
      denied: false
    });
    console.log('📝 Request updated to accepted');

    const insertPayload = {
      giver_id: req.user.id,
      collector_id: request.senderId,
      event_id: DEFAULT_EVENT_ID,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    };
    console.log('📦 Dogtag insert payload:', insertPayload);

    const [{ id: dogtagId }] = await knex('dogtags')
      .insert(insertPayload)
      .returning('id');
    console.log('🐾 Dogtag created with ID:', dogtagId);

    const transferPayload = {
      sender_id: req.user.id,
      receiver_id: request.senderId,
      tag_id: dogtagId,
      transfer_date: knex.fn.now()
    };
    console.log('🔄 Tag transfer insert payload:', transferPayload);

    await knex('tag_transfers').insert(transferPayload);
    console.log('✅ Tag transfer created');

    res.status(201).json({ message: 'Dogtags released and recorded successfully' });
  } catch (error) {
    console.error('❗Error releasing dogtags:', error.stack || error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
