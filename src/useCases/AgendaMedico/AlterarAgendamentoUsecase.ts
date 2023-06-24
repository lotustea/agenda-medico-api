import { AgendaMedicoRepository } from "../../repositories/AgendaMedicoRepository";
import { AgendaMedicoService } from "../../services/AgendaMedicoService";

export class AlterarAgendamentoUseCase {
  private agendaMedicoRepository = new AgendaMedicoRepository();
  private agendaMedicoService = new AgendaMedicoService();

  async execute(id: number, agendaMedicoData: any) {
    try {
      const { medico_id, data_agendamento } = agendaMedicoData;

      const horarioValido = await this.agendaMedicoService.verificarHorarioAgendamento(data_agendamento);

      if (!horarioValido) {
        return { error: "Horário de agendamento inválido. O horário permitido é das 08:00 às 17:00." };
      }

      const agendamentoExistente = await this.agendaMedicoService.verificarAgendamentoExistente(medico_id, data_agendamento);

      if (agendamentoExistente) {
        return { error: "Já existe um agendamento para o médico nesse horário." };
      }

      const agendaMedicoSalva = await this.agendaMedicoRepository.update(id, agendaMedicoData);

      return { agendaMedico: agendaMedicoSalva };
    } catch (error: any) {
      console.log(error);
      return { error: "Falha ao alterar agendamento" };
    }
  }
}
