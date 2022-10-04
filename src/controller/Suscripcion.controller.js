const { OK_STATUS, UNPROCESSABLE_ENTITY_STATUS, INTERNAL_SERVER_ERROR_STATUS, FORBIDDEN_STATUS } = require("../constants/httpConstants");
const SuscripcionService = require("../service/Suscripcion.service");
const { suscripcionSchema } = require("../utils/validator");
const { isLoggedIn } = require('../middleware/user');


class SuscripcionController {

  static async update(req, res) {
    try {
      const { calificacion, usuario, curso } = req.body
      const verifyToken = await isLoggedIn(req.headers);
      if (verifyToken) {
        await suscripcionSchema.validateAsync(req.body, { abortEarly: false, });
        const response = await SuscripcionService.update(calificacion, usuario, curso);
        res.status(OK_STATUS.code);
        res.json(response);
      } else {
        res.status(FORBIDDEN_STATUS.code);
        res.json(FORBIDDEN_STATUS.description);
      }
    } catch (err) {
      console.log(err);
      res.status(err.isJoi ? UNPROCESSABLE_ENTITY_STATUS.code : INTERNAL_SERVER_ERROR_STATUS.code);
      res.json(err.isJoi ? err.details : err);
    }
  }

}

module.exports = SuscripcionController;