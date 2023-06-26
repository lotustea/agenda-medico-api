import { Usuario } from "entities/Usuario";
import { AgendamentoRepository } from "../../repositories/AgendamentoRepository";
import { AgendamentoService } from "../../services/AgendamentoService";

export class AlterarAgendamentoUseCase {
  private agendamentoRepository = new AgendamentoRepository();
  private agendamentoService = new AgendamentoService();

  async execute(id: number, agendamentoData: any, usuario: Usuario) {
    try {
      if (usuario.perfil !== "paciente") {
        return { erro: "Perfil inválido para alterar agendamento" }
      }
      const { medico_id, data_agendamento } = agendamentoData;

      const horarioValido =
        await this.agendamentoService.verificarHorarioAgendamento(
          data_agendamento
        );

      if (!horarioValido) {
        return {
          error:
            "Horário de agendamento inválido. O horário permitido é das 08:00 às 17:00.",
        };
      }

      const agendamentoExistente =
        await this.agendamentoService.verificarAgendamentoExistente(
          medico_id,
          data_agendamento
        );

      if (agendamentoExistente) {
        return {
          error: "Já existe um agendamento para o médico nesse horário.",
        };
      }

      const agendamentoSalva = await this.agendamentoRepository.update(
        id,
        {
          ...agendamentoData,
          data_agendamento: new Date(agendamentoData.data_agendamento).toISOString().slice(0, 19),
        }
      );

      return { agendamento: agendamentoSalva };
    } catch (error: any) {
      console.log(error);
      return { error: "Falha ao alterar agendamento" };
    }
  }
}
