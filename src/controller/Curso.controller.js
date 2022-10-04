const CursoService = require('../service/Curso.service');
const { OK_STATUS, CREATED_STATUS, INTERNAL_SERVER_ERROR_STATUS, UNPROCESSABLE_ENTITY_STATUS } = require('../constants/httpConstants');
const { FETCH_DATA_ERROR_MESSAGE } = require('../constants/appConstants');
const { cursoSchema } = require('../utils/validator');


class CursoController {

  static async getAll(req, res) {
    try {
      const response = await CursoService.getAll(req, res);
      res.status(OK_STATUS.code);
      res.json(response);
    } catch (err) {
      res.status(INTERNAL_SERVER_ERROR_STATUS.code);
      res.json({ message: FETCH_DATA_ERROR_MESSAGE });
    }
  }

  static async getDetail(req, res) {
    try {
      const response = await CursoService.getDetail(req, res);
      res.status(OK_STATUS.code);
      res.json(response[0]);
    }
    catch (error) {
      console.log(error);
    }
  }

  static async create(req, res) {
    try {
      await cursoSchema.validateAsync(req.body, { abortEarly: false, });
      const response = await CursoService.create(req.body);
      res.status(CREATED_STATUS.code);
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(err.isJoi ? UNPROCESSABLE_ENTITY_STATUS.code : INTERNAL_SERVER_ERROR_STATUS.code);
      res.json(err.isJoi ? err.details : err);
    }
  }

  static async update(req, res) {
    try {
      const { ID, ...curso } = req.body
      await cursoSchema.validateAsync(curso, { abortEarly: false, });
      const response = await CursoService.update(ID, curso);
      res.status(OK_STATUS.code);
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(err.isJoi ? UNPROCESSABLE_ENTITY_STATUS.code : INTERNAL_SERVER_ERROR_STATUS.code);
      res.json(err.isJoi ? err.details : err);
    }
  }

  static async delete(req, res) {
    try {
      if (req.body.ID) {
        const response = await CursoService.delete(req.body.ID);
        res.status(OK_STATUS.code);
        res.json(response);
      } else {
        res.status(BAD_REQUEST_STATUS.code);
        res.json(BAD_REQUEST_STATUS.message);
      }
    } catch (err) {
      console.log('err');
      console.log(err);
      res.status(INTERNAL_SERVER_ERROR_STATUS.code);
      res.json(err);
    }
  }
}

module.exports = CursoController;