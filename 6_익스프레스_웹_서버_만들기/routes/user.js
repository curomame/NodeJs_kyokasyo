const express = require('express');

const router = express.Router();

// get user

router.get('/', (req,res) => {
  res.send('Hello, User');
});

module.exports = router;