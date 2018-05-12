/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const CompanyController = require('../../controller/companyController');
const companyController = new CompanyController();

/**
 * Car Entity routes
 */
router.get('/count', function (req, res) {
    companyController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    companyController.exists(req, res);
});

router.get('/:id', function (req, res) {
    companyController.findById(req, res);
});

router.get('/', function (req, res) {
    companyController.findAll(res);
});

router.put('/:id', function (req, res) {
    companyController.update(req, res);
});

router.post('/create', function (req, res) {
    companyController.create(req, res);
});

router.delete('/:id', function (req, res) {
    companyController.deleteById(req, res);
});

module.exports = router;