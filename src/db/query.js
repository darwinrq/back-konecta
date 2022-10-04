const { nullOrStringValue } = require("../utils/fetch.utils");

const GET_CURSOS_QUERY = 'SELECT * FROM tb_curso WHERE eliminado = 0;';
const GET_CURSO_DETAIL_QUERY = 'SELECT * FROM tb_curso WHERE ID = ?;';
const INSERT_CURSO_QUERY = 'INSERT INTO tb_curso SET ?';
const DELETE_CURSO_QUERY = 'UPDATE tb_curso set eliminado = 1 WHERE ID = ?';
const UPDATE_CURSO_QUERY = (ID, cursoUpdate) => (
    `UPDATE tb_curso c SET 
    titulo = COALESCE('${cursoUpdate.titulo}', c.titulo ),
    autor = COALESCE('${cursoUpdate.autor}', c.autor ),
    resumen = ${nullOrStringValue(cursoUpdate.resumen)},
    imagenPromocional = ${nullOrStringValue(cursoUpdate.imagenPromocional)},
    idiomas = ${nullOrStringValue(cursoUpdate.idiomas)},
    duracion = COALESCE(${cursoUpdate.duracion}, c.duracion ),
    precio = COALESCE(${cursoUpdate.precio}, c.precio ),
    fechaInicio = ${nullOrStringValue(cursoUpdate.fechaInicio)}
    WHERE c.ID = "${ID}"`
);
const UPDATE_CALIFICACION_QUERY = (calificacion, usuario, curso) => (
    `UPDATE tb_suscripcion SET 
    calificacion = ${calificacion} 
    WHERE usuario = '${usuario}' AND curso = '${curso}';`
);
const GET_LOGIN_QUERY = (usuario) => `SELECT * FROM tb_usuario WHERE usuario = '${usuario}';`;

module.exports = {
    GET_CURSOS_QUERY,
    GET_CURSO_DETAIL_QUERY,
    INSERT_CURSO_QUERY,
    UPDATE_CURSO_QUERY,
    DELETE_CURSO_QUERY,
    UPDATE_CALIFICACION_QUERY,
    GET_LOGIN_QUERY
};
