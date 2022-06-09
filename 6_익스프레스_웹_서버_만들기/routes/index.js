const express = require('express');

const router = express.Router()

// get 라이터

router.get('/', (req,res) => {
  res.send('Hello, Express');
});

module.exports = router;