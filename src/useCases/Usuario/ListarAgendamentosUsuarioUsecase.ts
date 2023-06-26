import { Usuario } from "entities/Usuario";
import { AgendamentoRepository } from "../../repositories/AgendamentoRepository";

export class ListarAgendamentosUsuarioUseCase {
  private authAgendamentoRepository = new AgendamentoRepository();

  async execute(
    usuario: Usuario,
    dataAgendamentoMin: Date,
    dataAgendamentoMax: Date
  ) {
    try {
      const methodMap = {
        medico: this.authAgendamentoRepository.findAllByMedico,
        paciente: this.authAgendamentoRepository.findAllByPaciente,
      };

      const findAllMethod = methodMap[usuario.perfil];

      if (!findAllMethod) {
        return { error: "Perfil inválido para listar os agendamentos" };
      }

      const agendamentos = await findAllMethod(
        this.authAgendamentoRepository,
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
