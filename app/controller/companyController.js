/* Load Car Data Access Object */
const CompanyDao = require('../dao/companyDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Car entity */
const Company = require('../model/company');

/**
 * Car Controller
 */
class CompanyController {

    constructor() {
        this.companyDao = new CompanyDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.companyDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.companyDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.companyDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let company = new Company();
        company.company_code = req.body.company_code;
        company.company_name = req.body.company_name;
        company.address = req.body.address;
        company.mail = req.body.mail;

        return this.companyDao.update(company)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let company = new Company();
        if (req.body.company_code) {
            company.company_code = req.body.company_code;
        }
        company.company_name = req.body.company_name;
        company.address = req.body.address;
        company.mail = req.body.mail;

        if (req.body.company_code) {
            return this.companyDao.createWithId(company)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.companyDao.create(company)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let company_code = req.params.company_code;

        this.companyDao.deleteById(company_code)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let company_code = req.params.company_code;

        this.companyDao.exists(company_code)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = CompanyController;