const EmployeeDao = require('../dao/employeeDao');

/* コマンド一覧を実装 */
const ControllerCommon = require('./common/controllerCommon');

const Employee = require('../model/employee');

/**
 * 従業員マスタコントローラー
 */
class EmployeeController {

    constructor() {
        this.employeeDao = new EmployeeDao();
        this.common = new ControllerCommon();
    }

    /**
     * 検索(pk:従業員コード)
     * @params req, res
     * @return entity
     */
    findById(req, res) {
      let employee_code = req.params.employee_code;
        this.employeeDao.findById(employee_code)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * 全件検索
     * @return all entities
     */
    findAll(res) {
        this.employeeDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * 全件合計
     * @return count
     */
    countAll(res) {

        this.employeeDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * 更新(pk:従業員コード)
     * @params req, res
     * @return true or false
     */
    update(req, res) {
        let employee = new Employee();
        employee.company_code = req.body.company_code;
        employee.employee_code = req.body.employee_code;
        employee.employee_name = req.body.employee_name;
        employee.address = req.body.address;
        employee.mail = req.body.mail;

        return this.employeeDao.update(employee)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * 新規登録
     * @params req, res
     * returns status
     */
    create(req, res) {
        let employee = new Employee();
        if (req.body.employee_code) {
            employee.employee_code = req.body.employee_code;
        }
        employee.company_code = req.body.company_code;
        employee.employee_name = req.body.employee_name;
        employee.address = req.body.address;
        employee.mail = req.body.mail;

        if (req.body.employee_code) {
            return this.employeeDao.createWithId(employee)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.employeeDao.create(employee)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * 削除(pk:従業員コード)
     * @params req, res
     * returns status
     */
    deleteById(req, res) {
        let employee_code = req.params.employee_code;

        this.employeeDao.deleteById(employee_code)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * 存在チェック(pk:従業員コード)
     * @params req, res
     * @return true or false
     */
    exists(req, res) {
        let employee_code = req.params.employee_code;

        this.employeeDao.exists(employee_code)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = EmployeeController;