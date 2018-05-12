/* Load Driver entity */
const Driver = require('../model/company');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Driver Data Access Object
 */
class CompanyDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(company_code) {
        let sqlRequest = "SELECT company_code, company_name, address, mail FROM company WHERE company=$company_code";
        let sqlParams = {$company_code: company_code};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Company(row.company_code, row.company_name, row.address, row.mail));
    };

    /**
     * Finds all entities.
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
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM company";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Driver
     * @return true if the entity has been updated, false if not found and not updated
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
     * Creates the given entity in the database
     * @params Driver
     * returns database insertion status
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
     * Creates the given entity with a provided in the database
     * @params Driver
     * returns database insertion status
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
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(company_code) {
        let sqlRequest = "DELETE FROM company WHERE company_code=$company_code";
        let sqlParams = {$company_code: company_code};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(company_code) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM company WHERE company_code like '%'||$company_code||'%' ";
        let sqlParams = {$company_code: company_code};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = CompanyDao;