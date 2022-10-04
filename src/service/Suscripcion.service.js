const Conection = require('../db/conection/Mysql');
const { UPDATE_CALIFICACION_QUERY } = require("../db/query");


class SuscripcionService {

  static async update(calificacion, usuario, curso) {
    await Conection.executeSQL(UPDATE_CALIFICACION_QUERY(calificacion, usuario, curso));
    return calificacion;
  }
}

module.exports = SuscripcionService;