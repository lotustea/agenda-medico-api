import * as express from "express";
import PacienteController from "../api/controllers/PacienteController";
import { authMiddleware } from "../api/middlewares/authMiddleware";

const PacienteRoutes = express.Router();

/**
 * Rotas Paciente
 */

/**
 * Retorna a lista de pacientes
 * @route GET /api/paciente
 * @group Paciente - listar
 * @param {integer} page.query - Número da página
 * @param {integer} limit.query - Limite de resultados por página
 * @param {string} nome.query - Nome do paciente (filtro - opcional)
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
PacienteRoutes.get("/", authMiddleware, PacienteController.index);

/**
 * Visualizar um paciente específico
 * @route GET /api/paciente/{id}/visualizar
 * @group Paciente - Visualizar
 * @param {integer} id.path.required - ID do paciente
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
PacienteRoutes.get("/:id/visualizar", authMiddleware, PacienteController.show);

/**
 * Atualiza os dados de um paciente
 * @route PUT /api/paciente/{id}/alterar
 * @group Paciente - Atualizar
 * @param {integer} id.path.required - ID do paciente
 * @param {string} enfermidade.body - Enfermidade do paciente
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
PacienteRoutes.put("/:id/alterar", authMiddleware, PacienteController.update);

/**
 * Exclui um paciente
 * @route DELETE /api/paciente/{id}/excluir
 * @group Paciente - Excluir
 * @param {integer} id.path.required - ID do paciente
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
PacienteRoutes.delete("/:id/excluir", authMiddleware, PacienteController.delete);

export { PacienteRoutes };
