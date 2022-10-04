const Conection = require('../db/conection/Mysql');
const { GET_LOGIN_QUERY } = require("../db/query");


class AuthService {

  static async getUser(usuario) {
    return await Conection.executeSQL(GET_LOGIN_QUERY(usuario));
  }
}

module.exports = AuthService;