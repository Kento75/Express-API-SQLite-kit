/**
 * Express ルート設定
 */
const express = require('express');
const router = express.Router();

/* API ルートエンドポイント */
router.use('/company', require('./api/companyRoutes'));
router.use('/employee', require('./api/employeeRoutes'));

module.exports = router;