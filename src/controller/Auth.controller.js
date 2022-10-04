const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, BAD_USER } = require("../constants/appConstants");
const { OK_STATUS, UNPROCESSABLE_ENTITY_STATUS, INTERNAL_SERVER_ERROR_STATUS, BAD_REQUEST_STATUS } = require("../constants/httpConstants");
const AuthService = require("../service/Auth.service");
const { AuthSchema } = require("../utils/validator");



class AuthController {

  static async login(req, res) {
    try {
      const { usuario, clave } = req.body
      await AuthSchema.validateAsync(req.body, { abortEarly: false, });
      const response = await AuthService.getUser(usuario);
      if (!response.length) {
        res.status(BAD_REQUEST_STATUS.code);
        res.json({ message: BAD_USER });
      } else {
        bcrypt.compare(clave, response[0].clave, (err, result) => {
          if (result) {
            const token = jwt.sign({
              username: response[0].usuario,
              userId: response[0].ID,
              tipo: response[0].tipo,
            }, SECRET_KEY, { expiresIn: "1h" });
            res.status(OK_STATUS.code);
            res.json({ ID: response[0].ID, usuario: response[0].usuario, tipo: response[0].tipo, token });
          } else {
            res.status(BAD_REQUEST_STATUS.code);
            res.json({ message: BAD_USER });
          }
        }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(err.isJoi ? UNPROCESSABLE_ENTITY_STATUS.code : INTERNAL_SERVER_ERROR_STATUS.code);
      res.json(err.isJoi ? err.details : err);
    }
  }

}

module.exports = AuthController;