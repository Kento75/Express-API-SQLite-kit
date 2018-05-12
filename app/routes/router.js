/**
 * Express ルート設定
 */
const express = require('express');
const router = express.Router();

/* API ルートエンドポイント */
router.use('/car', require('./api/carRoutes'));
router.use('/driver', require('./api/driverRoutes'));
router.use('/company', require('./api/companyRoutes'));

module.exports = router;