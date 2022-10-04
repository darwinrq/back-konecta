const MySqlDatabase = require('../mysql/MysqlDataBase');
const dbconfig = require('../../config/db.json');
let poolConnection;

class Connection {
    static async _createPool() {
        if (!poolConnection) {
            poolConnection = await MySqlDatabase.createPool(dbconfig);
        }
    }

    static async executeSQL(sql, bindParams, target) {
        await this._createPool();
        const result = await MySqlDatabase.executeSQL(sql, bindParams, target, poolConnection);
        return result;
    }

    static async executeQuery(sql, bindParams, printQuery = false) {

        await this._createPool();
        const result = await MySqlDatabase.executeQuery(sql, bindParams, poolConnection, printQuery);
        return result;
    }
}

module.exports = Connection;