const MySqlDb = require('mysql');
const Util = require('util');
const BusinessError = require('../../models/BusinessError');
const HttpConstants = require('../../constants/httpConstants');

class MySqlDatabase {
    static async createPool(dbconfig) {
        const poolConnection = MySqlDb.createPool(dbconfig);
        poolConnection.query = Util.promisify(poolConnection.query);
        poolConnection.end = Util.promisify(poolConnection.end);
        return poolConnection;
    }

    static async closePool(poolConnection) {
        try {
            if (poolConnection) {
                await poolConnection.end();
            }
        } catch (error) {
            throw new BusinessError({
                code: 'DbError',
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: [error.stack],
            });
        }
    }

    static async executeSQL(sql, bindParams, target, pool) {
        try {
            const data = await pool.query(
                sql, bindParams
            );
            return data;
        } catch (error) {
            console.log(error);
            throw new BusinessError({
                code: error.code,
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: error.sqlMessage,
            });
        }
    }

    static async executeQuery(sql, bindParams, pool, printQuery) {
        try {
            let query = await this.replaceParameter(sql, bindParams);
            if (printQuery) {

                console.log('Query : ');
                console.log(query);
            }
            return await pool.query(query);
        } catch (error) {
            console.log(error);
            throw new BusinessError({
                code: error.code,
                httpCode: HttpConstants.INTERNAL_SERVER_ERROR_STATUS.code,
                messages: error.sqlMessage,
            });
        }
    }

    static async replaceParameter(query, dictParameters) {
        let parameter = '';
        for (let key in dictParameters) {
            if (dictParameters[key]) {
                parameter = dictParameters[key];
            }
            query = query.replace(new RegExp(key, 'g'), parameter);
            parameter = '';
        }
        return query;
    }

}

module.exports = MySqlDatabase;