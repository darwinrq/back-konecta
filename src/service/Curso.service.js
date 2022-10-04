const Joi = require('joi');
const uuid = require('uuid');
const Conection = require('../db/conection/Mysql');
const { INTERNAL_SERVER_ERROR_STATUS } = require('../constants/httpConstants');
const { fetchData } = require('../utils/fetch.utils');
const BusinessError = require('../models/BusinessError');
const { GET_CURSOS_QUERY, GET_CURSO_DETAIL_QUERY, INSERT_CURSO_QUERY, DELETE_CURSO_QUERY, UPDATE_CURSO_QUERY } = require('../db/query');

class CursoService {
  static async getAll() {
    try {
      const cursos = await Conection.executeQuery(GET_CURSOS_QUERY, {})
      return { cursos };
    } catch (err) {
      throw new BusinessError({
        code: '',
        httpCode: INTERNAL_SERVER_ERROR_STATUS.code,
        messages: INTERNAL_SERVER_ERROR_STATUS.description
      });
    }
  }

  static async getDetail(req, res) {
    const { params } = req;
    try {
      return await Conection.executeSQL(GET_CURSO_DETAIL_QUERY, params.id);
    } catch (error) {
      console.log('on error');
      console.log(error);
      res.status(error.httpCode);
      res.json({ message: error.messages });
    }
  }

  static async create(curso) {
    curso.ID = uuid.v4();
    await Conection.executeSQL(INSERT_CURSO_QUERY, curso);
    return curso;
  }

  static async update(ID, curso) {
    await Conection.executeSQL(UPDATE_CURSO_QUERY(ID, curso));
    return curso;
  }

  static async delete(ID) {
    await Conection.executeSQL(DELETE_CURSO_QUERY, ID);
    return { "message": ID }
  }

}

module.exports = CursoService;
