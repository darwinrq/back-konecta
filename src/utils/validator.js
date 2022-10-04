const Joi = require('joi');

const cursoSchema = Joi.object({
    titulo: Joi.string().required(),
    resumen: Joi.string().allow(null).allow(''),
    autor: Joi.string().required(),
    imagenPromocional: Joi.string().allow(null).allow(''),
    calificacion: Joi.number().allow(null).allow(''),
    contador: Joi.number().allow(null).allow(''),
    idiomas: Joi.string().allow(null).allow(''),
    duracion: Joi.number().required(),
    precio: Joi.number().required(),
    fechaInicio: Joi.date().allow(null).allow(''),
})

const suscripcionSchema = Joi.object({
    calificacion: Joi.number()
        .allow(null)
        .integer()
        .min(1)
        .max(5),
    usuario: Joi.string().required(),
    curso: Joi.string().required(),
})

const AuthSchema = Joi.object({
    usuario: Joi.string().required(),
    clave: Joi.string().required(),
})


module.exports = {
    cursoSchema,
    suscripcionSchema,
    AuthSchema
};