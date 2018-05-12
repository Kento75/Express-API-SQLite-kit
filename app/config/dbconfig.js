let sqlite3 = require('sqlite3').verbose();

/*
 * データベース設定
 */

/* DBをロード */
let db = new sqlite3.Database('./sqlite.db');

/* テーブルが存在しない場合は作成 */
let init = function () {
    // carテーブル
    db.run("CREATE TABLE if not exists car (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " maker TEXT," +
        " model TEXT," +
        " year INT," +
        " driver INT" +
        ")");

    // driverテーブル
    db.run("CREATE TABLE if not exists driver (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " firstName TEXT," +
        " lastName TEXT," +
        " car INT" +
        ")");

    // 会社マスタテーブル
    db.run("CREATE TABLE if not exists company (" +
        "company_code TEXT," +
        " company_name TEXT," +
        " address TEXT," +
        " mail TEXT" +
        ")");
};

module.exports = {
    init: init,
    db: db
};

