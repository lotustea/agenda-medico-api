import { UsuarioService } from "../../services/UsuarioService";
import { PacienteRepository } from "./../../repositories/PacienteRepository";
import { MedicoRepository } from "./../../repositories/MedicoRepository";
import { IMedico } from "entities/interfaces/IMedico";
import { IPaciente } from "entities/interfaces/IPaciente";
import { getPasswordHash } from "../../utils/getPasswordHash";

export class CadastrarUsuarioUseCase {
  private usuarioService = new UsuarioService();
  private pacienteRepository = new PacienteRepository();
  private medicoRepository = new MedicoRepository();

  async execute(data: any) {
    try {
      const { usuario, senha, perfil, pessoaFisica } = data;
      const hashSenha = await getPasswordHash(senha);

      const usuarioSalvo = await this.usuarioService.criarUsuario(
        { usuario, senha: hashSenha, perfil },
        pessoaFisica
      );

      const actions = {
        paciente: async () => {
          const paciente: IPaciente = {
            usuario: usuarioSalvo,
            enfermidade: "Enxaqueca", //TO DO: Implementar enfermidades
          };
          await this.pacienteRepository.create(paciente);
        },
        medico: async () => {
          const medico: IMedico = {
            usuario: usuarioSalvo,
            especialidade: "Neurologista", //TO DO: Implementar especialidades
          };
          await this.medicoRepository.create(medico);
        },
      };

      return usuarioSalvo;
    } catch (error: any) {
      console.log(error)
      return { error: "Falha ao cadastrar usuário" };
    }
  }
}
