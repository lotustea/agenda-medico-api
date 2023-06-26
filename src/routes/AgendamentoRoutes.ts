import * as express from "express";
import AgendamentoController from "../api/controllers/AgendamentoController";
import { authMiddleware } from "../api/middlewares/authMiddleware";

const AgendamentoRoutes = express.Router();

/**
 * Rotas Agendamento
 */
/**
 * Retorna a lista de agendaAgendamentos
 * @route GET /api/agendamento
 * @group Usuário - listar
 * @param {integer} page.query - Número da página
 * @param {integer} limit.query - Limite de resultados por página
 * @param {Date} dataAgendamentoMin.query - Data de agendamento minima (filtro - opcional)
 * @param {Date} dataAgendamentoMax.query - Data de agendamento maxima (filtro - opcional)
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
AgendamentoRoutes.get("/", authMiddleware, AgendamentoController.index);

/**
 * Cadastrar um novo agendamento
 * @route POST /api/agendamento/cadastrar
 * @group Agendamento - Criar
 * @param {number} pacienteId.body.required - ID do paciente
 * @param {number} medicoId.body.required - ID do medico
 * @param {Date} dataAgendamento.body.required - Data e hora do agendamento
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
AgendamentoRoutes.post("/cadastrar", authMiddleware, AgendamentoController.create);

/**
 * Atualiza os dados de um agendamento
 * @route PUT /api/agendamento/{id}/alterar
 * @group Agendamento - Atualizar
 * @param {integer} id.path.required - ID do agendamento
 * @param {number} pacienteId.body- ID do paciente
 * @param {number} medicoId.body - ID do medico
 * @param {Date} dataAgendamento.body- Data e hora do agendamento
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 */
AgendamentoRoutes.put("/:id/alterar", authMiddleware, AgendamentoController.update);

/**
 * Exclui um agendamento
 * @route DELETE /api/agendamento/{id}/excluir
 * @group Agendamento - Atualizar
 * @param {integer} id.path.required - ID do agendamento
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 */
AgendamentoRoutes.delete("/:id/excluir", authMiddleware, AgendamentoController.delete);

export { AgendamentoRoutes };
