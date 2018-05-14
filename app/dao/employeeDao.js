const Employee = require('../model/employee');

const daoCommon = require('./commons/daoCommon');

/**
 * 従業員マスター　Dao
 */
class EmployeeDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * 検索(pk:従業員コード)
     * @params employee_code
     * @return entity
     */
    findById(employee_code) {
        let sqlRequest = "SELECT company_code, employee_code, employee_name, age, sex FROM employee WHERE employee_code like '%'||$employee_code||'%' ";
        let sqlParams = {$employee_code: employee_code};
        return this.common.findOne(sqlRequest, sqlParams).then(rows =>{
            let companies = [];
            for (const row of rows) {
                companies.push(new Employee( row.company_code, row.employee_code, row.employee_name, row.age, row.sex));
            }
            return companies;
        });
    };

    /**
     * 検索(全件)
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM employee";
        return this.common.findAll(sqlRequest).then(rows => {
            let companies = [];
            for (const row of rows) {
                companies.push(new Employee( row.company_code, row.employee_code, row.employee_name, row.age, row.sex));
            }
            return companies;
        });
    };

    /**
     * 件数(全件)
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM employee";
        return this.common.findOne(sqlRequest);
    };

    /**
     * 更新(pk:従業員コード)
     * @params Employee
     * @return true or false
     */
    update(Employee) {
        let sqlRequest = "UPDATE employee SET " +
            "company_code=$company_code," +
            "employee_name=$employee_name, " +
            "age=$age," +
            "sex=$sex, " +
            "WHERE employee_code=$employee_code";

        let sqlParams = {
            $company_code:  Employee.company_code,
            $employee_code: Employee.employee_code,
            $employee_name: Employee.employee_name,
            $age:           Employee.age,
            $sex:           Employee.sex
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 新規登録(従業員コードなし)
     * @params Employee
     * returns status
     */
    create(Employee) {
        let sqlRequest = "INSERT into employee (company_code, employee_code, employee_name, age, sex) " +
            "VALUES ($company_code, $employee_code, $employee_name, $age, $sex)";
        let sqlParams = {
            company_code:   Employee.company_code,
            $employee_code: Employee.employee_code,
            $employee_name: Employee.employee_name,
            $age:           Employee.age,
            $sex:           Employee.sex
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 新規登録(pk:従業員コード)
     * @params Employee
     * returns status
     */
    createWithId(Employee) {
        let sqlRequest = "INSERT into employee (company_code, employee_code, employee_name, age, sex) " +
            "VALUES ($company_code, $employee_code, $employee_name, $age, $sex)";
        let sqlParams = {
            $company_code:  Employee.company_code,
            $employee_code: Employee.employee_code,
            $employee_name: Employee.employee_name,
            $age:           Employee.age,
            $sex:           Employee.sex
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 削除(pk:従業員コード)
     * @params employee_code
     * returns status
     */
    deleteById(employee_code) {
        let sqlRequest = "DELETE FROM employee WHERE employee_code=$employee_code";
        let sqlParams = {$employee_code: employee_code};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 存在チェック(部分一致)
     * @params employee_code
     * returns true or false
     */
    exists(employee_code) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM employee WHERE employee_code like '%'||$employee_code||'%' ";
        let sqlParams = {$employee_code: employee_code};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = EmployeeDao;