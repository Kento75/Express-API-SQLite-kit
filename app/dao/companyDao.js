const Company = require('../model/company');

const daoCommon = require('./commons/daoCommon');

/**
 * 会社マスター　Dao
 */
class CompanyDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * 検索(pk:会社コード)
     * @params company_code
     * @return entity
     */
    findById(company_code) {
        let sqlRequest = "SELECT company_code, company_name, address, mail FROM company WHERE company=$company_code";
        let sqlParams = {$company_code: company_code};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Company(row.company_code, row.company_name, row.address, row.mail));
    };

    /**
     * 検索(全件)
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM company";
        return this.common.findAll(sqlRequest).then(rows => {
            let companies = [];
            for (const row of rows) {
                companies.push(new Company(row.company_code, row.company_name, row.address, row.mail));
            }
            return companies;
        });
    };

    /**
     * 件数(全件)
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM company";
        return this.common.findOne(sqlRequest);
    };

    /**
     * 更新(pk:会社コード)
     * @params Company
     * @return true or false
     */
    update(Company) {
        let sqlRequest = "UPDATE company SET " +
            "company_name=$company_name, " +
            "address=$address " +
            "mail=$mail, " +
            "WHERE company_code=$company_code";

        let sqlParams = {
            $company_code: Company.company_code,
            $company_name: Company.company_name,
            $address:      Company.address,
            $mail:         Company.mail
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 新規登録(会社コードなし)
     * @params Company
     * returns status
     */
    create(Company) {
        let sqlRequest = "INSERT into company (company_code, company_name, address, mail) " +
            "VALUES ($company_code, $company_name, $address, $mail)";
        let sqlParams = {
            $company_code: Company.company_code,
            $company_name: Company.company_name,
            $address:      Company.address,
            $mail:         Company.mail
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 新規登録(pk:会社コード)
     * @params Company
     * returns status
     */
    createWithId(Company) {
        let sqlRequest = "INSERT into company (company_code, company_name, address, mail) " +
            "VALUES ($company_code, $company_name, $address, $mail)";
        let sqlParams = {
            $company_code: Company.company_code,
            $company_name: Company.company_name,
            $address:      Company.address,
            $mail:         Company.mail
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 削除(pk:会社コード)
     * @params company_code
     * returns status
     */
    deleteById(company_code) {
        let sqlRequest = "DELETE FROM company WHERE company_code=$company_code";
        let sqlParams = {$company_code: company_code};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * 存在チェック
     * @params company_code
     * returns true or false
     */
    exists(company_code) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM company WHERE company_code like '%'||$company_code||'%' ";
        let sqlParams = {$company_code: company_code};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = CompanyDao;