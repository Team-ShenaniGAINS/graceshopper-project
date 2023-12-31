const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/cart', require('./cart'));
router.use('/checkout', require('./checkout')); 

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

router.use((err, req, res, next) => {
  // Error handling middleware
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

module.exports = router;
