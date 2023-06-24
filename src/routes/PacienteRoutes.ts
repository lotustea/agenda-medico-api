import * as express from "express";
import PacienteController from "../api/controllers/PacienteController";

const PacienteRoutes = express.Router();

/**
 * Rotas Paciente
 */

/**
 * Retorna a lista de pacientes
 * @route GET /api/paciente
 * @group Usuário - listar
 * @param {integer} page.query - Número da página
 * @param {integer} limit.query - Limite de resultados por página
 * @param {string} nome.query - Nome do paciente (filtro - opcional)
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
PacienteRoutes.get("/", PacienteController.index);

export { PacienteRoutes };
