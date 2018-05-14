const express = require('express');
const router = express.Router();

/* コントローラー実装 */
const CompanyController = require('../../controller/companyController');
const companyController = new CompanyController();

/**
 * ルート設定
 */

// GET
router.get('/count', function (req, res) {
    companyController.countAll(res);
});

router.get('/exists/:company_code', function (req, res) {
    companyController.exists(req, res);
});

router.get('/find/:company_code', function (req, res) {
    companyController.findById(req, res);
});

router.get('/find', function (req, res) {
    companyController.findAll(res);
});

// PUT
router.put('/:company_code', function (req, res) {
    companyController.update(req, res);
});

// DELETE
router.delete('/:company_code', function (req, res) {
    companyController.deleteById(req, res);
});

module.exports = router;