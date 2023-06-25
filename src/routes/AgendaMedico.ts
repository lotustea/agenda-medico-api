import * as express from "express";
import AgendaMedicoController from "../api/controllers/AgendaMedicoController";

const AgendaMedicoRoutes = express.Router();

/**
 * Rotas AgendaMedico
 */
/**
 * Retorna a lista de agendaAgendaMedicos
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
AgendaMedicoRoutes.get("/", AgendaMedicoController.index);

/**
 * Cadastrar um novo agendamento
 * @route POST /api/agendamento/cadastrar
 * @group AgendaMedico - Criar
 * @param {number} pacienteId.body.required - ID do paciente
 * @param {number} medicoId.body.required - ID do medico
 * @param {Date} dataAgendamento.body.required - Data e hora do agendamento
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
AgendaMedicoRoutes.post("/", AgendaMedicoController.index);

/**
 * Atualiza os dados de um agendamento
 * @route PUT /api/agendamento/{id}/alterar
 * @group AgendaMedico - Atualizar
 * @param {integer} id.path.required - ID do agendamento
 * @param {number} pacienteId.body- ID do paciente
 * @param {number} medicoId.body - ID do medico
 * @param {Date} dataAgendamento.body- Data e hora do agendamento
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 */
AgendaMedicoRoutes.put("/:id/alterar", AgendaMedicoController.update);

/**
 * Exclui um agendamento
 * @route DELETE /api/agendamento/{id}/excluir
 * @group AgendaMedico - Atualizar
 * @param {integer} id.path.required - ID do agendamento
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 */
AgendaMedicoRoutes.delete("/:id/excluir", AgendaMedicoController.delete);

export { AgendaMedicoRoutes };
