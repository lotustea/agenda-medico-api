import * as express from "express";
import MedicoController from "../api/controllers/MedicoController";
import { authMiddleware } from "../api/middlewares/authMiddleware";

const MedicoRoutes = express.Router();

/**
 * Rotas Medico
 */
/**
 * Retorna a lista de medicos
 * @route GET /api/medico
 * @group Medico - listar
 * @param {integer} page.query - Número da página
 * @param {integer} limit.query - Limite de resultados por página
 * @param {string} nome.query - Nome do medico (filtro - opcional)
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
MedicoRoutes.get("/", authMiddleware, MedicoController.index);

/**
 * Visualizar um médico específico
 * @route GET /api/medico/{id}/visualizar
 * @group Medico - Visualizar
 * @param {integer} id.path.required - ID do médico
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
MedicoRoutes.get("/:id/visualizar", authMiddleware, MedicoController.show);

/**
 * Atualiza os dados de um médico
 * @route PUT /api/medico/{id}/alterar
 * @group Medico - Atualizar
 * @param {integer} id.path.required - ID do médico
 * @param {string} especialidade.body - Especialidade do médico
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
MedicoRoutes.put("/:id/alterar", authMiddleware, MedicoController.update);

/**
 * Exclui um médico
 * @route DELETE /api/medico/{id}/excluir
 * @group Medico - Excluir
 * @param {integer} id.path.required - ID do médico
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
MedicoRoutes.delete("/:id/excluir", authMiddleware, MedicoController.delete);

export { MedicoRoutes };
