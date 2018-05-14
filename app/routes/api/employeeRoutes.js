const express = require('express');
const router = express.Router();

/* コントローラー実装 */
const EmployeeController = require('../../controller/employeeController');
const employeeController = new EmployeeController();

/**
 * ルート設定
 */

// GET
router.get('/count', function (req, res) {
    employeeController.countAll(res);
});

router.get('/exists/:employee_code', function (req, res) {
    employeeController.exists(req, res);
});

router.get('/find/:employee_code', function (req, res) {
    employeeController.findById(req, res);
});

router.get('/find', function (req, res) {
    employeeController.findAll(res);
});

// PUT
router.put('/:employee_code', function (req, res) {
    employeeController.update(req, res);
});

// DELETE
router.delete('/:employee_code', function (req, res) {
    employeeController.deleteById(req, res);
});

module.exports = router;