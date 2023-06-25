import { Usuario } from "entities/Usuario";
import { AgendaMedicoRepository } from "../../repositories/AgendaMedicoRepository";

export class ListarAgendamentosUsuarioUseCase {
  private authAgendaMedicoRepository = new AgendaMedicoRepository();

  async execute(
    usuario: Usuario,
    dataAgendamentoMin: Date,
    dataAgendamentoMax: Date
  ) {
    try {
      const methodMap = {
        medico: this.authAgendaMedicoRepository.findAllByMedico,
        paciente: this.authAgendaMedicoRepository.findAllByPaciente,
      };

      const findAllMethod = methodMap[usuario.perfil];

      if (!findAllMethod) {
        return { error: "Perfil inválido para listar os agendamentos" };
      }

      const agendamentos = await findAllMethod.call(
        this.authAgendaMedicoRepository,
        usuario.id,
        dataAgendamentoMin,
        dataAgendamentoMax
      );

      return { data: agendamentos };
    } catch (error) {
      return { error: "Falha ao listar os agendamentos" };
    }
  }
}
