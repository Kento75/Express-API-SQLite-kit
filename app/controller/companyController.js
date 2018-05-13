const CompanyDao = require('../dao/companyDao');

/* コマンド一覧を実装 */
const ControllerCommon = require('./common/controllerCommon');

const Company = require('../model/company');

/**
 * 会社マスタコントローラー
 */
class CompanyController {

    constructor() {
        this.companyDao = new CompanyDao();
        this.common = new ControllerCommon();
    }

    /**
     * 検索(pk:会社コード)
     * @params req, res
     * @return entity
     */
    findById(req, res) {
      let company_code = req.params.company_code;
        this.companyDao.findById(company_code)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * 全件検索
     * @return all entities
     */
    findAll(res) {
        this.companyDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * 全件合計
     * @return count
     */
    countAll(res) {

        this.companyDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * 更新(pk:会社コード)
     * @params req, res
     * @return true or false
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
     * 新規登録
     * @params req, res
     * returns status
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
     * 削除(pk:会社コード)
     * @params req, res
     * returns status
     */
    deleteById(req, res) {
        let company_code = req.params.company_code;

        this.companyDao.deleteById(company_code)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * 存在チェック(pk:会社コード)
     * @params req, res
     * @return true or false
     */
    exists(req, res) {
        let company_code = req.params.company_code;

        this.companyDao.exists(company_code)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = CompanyController;