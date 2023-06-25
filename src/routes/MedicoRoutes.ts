import * as express from "express";
import MedicoController from "../api/controllers/MedicoController";
import { authMiddleware } from "../api/middlewares/AuthMiddleware";

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

export { MedicoRoutes };
