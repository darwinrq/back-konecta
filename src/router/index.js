const express = require('express');
const AuthController = require('../controller/Auth.controller');
const router = express.Router();
const CursoController = require('../controller/Curso.controller');
const SuscripcionController = require('../controller/Suscripcion.controller');

router.get('/cursos', CursoController.getAll);
router.get('/curso/:id', CursoController.getDetail);
router.post('/curso', CursoController.create);
router.put('/curso', CursoController.update);
router.delete('/curso', CursoController.delete);
router.put('/calificacion', SuscripcionController.update);
router.post('/login', AuthController.login);


module.exports = router;