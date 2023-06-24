import * as express from "express";
import AgendaMedicoController from "../api/controllers/AgendaMedicoController";

const AgendaMedicoRoutes = express.Router();

/**
 * Rotas AgendaMedico
 */
/**
 * Retorna a lista de agendaAgendaMedicos
 * @route GET /api/agenda
 * @group Usuário - listar
 * @param {integer} page.query - Número da página
 * @param {integer} limit.query - Limite de resultados por página
 * @param {Date} dataAgendamentoMin.query - Data de agendamento minima (filtro - opcional)
 * @param {Date} dataAgendamentoMax.query - Data de agendamento maxima (filtro - opcional)
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
AgendaMedicoRoutes.get("/", AgendaMedicoController.index);

export { AgendaMedicoRoutes };
