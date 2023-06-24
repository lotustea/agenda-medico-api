import * as express from "express";
import UsuarioController from "../api/controllers/UsuarioController";
const UsuarioRoutes = express.Router();


/**
 * Rotas Usuário
 */
/**
 * Retorna a lista de usuarios
 * @route GET /api/usuario
 * @group Usuário - listar
 * @param {integer} page.query - Número da página
 * @param {integer} limit.query - Limite de resultados por página
 * @param {string} usuario.query - Nome de usuario (filtro - opcional)
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
UsuarioRoutes.get("/", UsuarioController.index);

/**
 * Cadastrar um novo usuário
 * @route POST /api/usuario/cadastrar
 * @group Usuário - Criar
 * @param {string} usuario.body.required - Usuário
 * @param {string} senha.body.required - Senha
 * @param {string} perfil.body.required - Perfil do usuário ('medico', 'secretaria', 'paciente')
 * @param {string} cpf.body - CPF
 * @param {string} dataNascimento.body.required - Data de nascimento
 * @param {string} nome.body.required - Nome
 * @param {string} sobrenome.body.required - Sobrenome
 * @param {string} email.body.required - Email
 * @param {string} logradouro.body.required - Logradouro
 * @param {string} numero.body.required - Número
 * @param {string} cep.body.required - CEP
 * @param {string} cidade.body.required - Cidade
 * @param {string} estado.body.required - Estado
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 * @returns {object} 500 - Erro interno
 */
UsuarioRoutes.post("/cadastrar", UsuarioController.create);

/**
 * Atualiza os dados de um usuário
 * @route PUT /api/usuario/{id}/alterar
 * @group Usuário - Atualizar
 * @param {integer} id.path.required - ID do usuário
 * @param {string} usuario.body - Usuário
 * @param {string} senha.body - Senha
 * @param {string} perfil.body - Perfil do usuário ('medico', 'secretaria', 'paciente')
 * @param {string} cpf.body - CPF
 * @param {string} dataNascimento.body - Data de nascimento
 * @param {string} nome.body - Nome
 * @param {string} sobrenome.body - Sobrenome
 * @param {string} email.body - Email
 * @param {string} logradouro.body - Logradouro
 * @param {string} numero.body - Número
 * @param {string} cep.body - CEP
 * @param {string} cidade.body - Cidade
 * @param {string} estado.body - Estado
 * @security JWT
 * @returns {object} 200 - Resposta de sucesso
 */
UsuarioRoutes.put("/:id/alterar", UsuarioController.update);

export { UsuarioRoutes };
