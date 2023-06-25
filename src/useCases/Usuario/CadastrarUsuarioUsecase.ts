import { UsuarioRepository } from './../../repositories/UsuarioRepository';
import { UsuarioService } from "../../services/UsuarioService";
import { PacienteRepository } from './../../repositories/PacienteRepository';
import { MedicoRepository } from './../../repositories/MedicoRepository';
import { IMedico } from "../../entities/interfaces/IMedico";
import { IPaciente } from "../../entities/interfaces/IPaciente";
import { getPasswordHash } from "../../utils/getPasswordHash";

export class CadastrarUsuarioUseCase {

  private usuarioService = new UsuarioService();
  private pacienteRepository = new PacienteRepository();
  private medicoRepository = new MedicoRepository();
  private usuarioRepository = new UsuarioRepository();

  async execute(data: any) {
    try {
      const { usuario, senha, perfil, pessoaFisica } = data;
      const hashSenha = await getPasswordHash(senha);

      const usuarioExistente = await this.usuarioRepository.findByUsuario(usuario);

      if (usuarioExistente) {
        return { error: "Já existe um usuario com o mesmo nome de usuario." }
      }

      const usuarioSalvo = await this.usuarioService.criarUsuario(
        { usuario, senha: hashSenha, perfil },
        pessoaFisica
      );

      const actions = {
        paciente: async () => {
          const paciente: IPaciente = {
            usuario: usuarioSalvo,
            enfermidade: 'Enxaqueca', //TO DO: Implementar enfermidades
          };
          await this.pacienteRepository.create(paciente);
        },
        medico: async () => {
          const medico: IMedico = {
            usuario: usuarioSalvo,
            especialidade: 'Neurologista', //TO DO: Implementar especialidades
          };
          await this.medicoRepository.create(medico);
        }
      };
      if (actions[perfil]) await actions[perfil]();

      return usuarioSalvo;

    } catch (error: any) {
      return { error: "Falha ao cadastrar usuário" };
    }
  }
}
