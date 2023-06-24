import { AgendaMedicoRepository } from "../repositories/AgendaMedicoRepository";

export class AgendaMedicoService {
  private agendaMedicoRepository = new AgendaMedicoRepository();

  async verificarHorarioAgendamento(data_agendamento: Date): Promise<boolean> {
    const horaInicio = new Date(data_agendamento).setHours(8, 0, 0, 0);
    const horaFim = new Date(data_agendamento).setHours(17, 0, 0, 0);
    const horarioAgendamento = new Date(data_agendamento).getTime();

    return horarioAgendamento >= horaInicio && horarioAgendamento <= horaFim;
  }

  async verificarAgendamentoExistente(medico_id: number, data_agendamento: Date): Promise<boolean> {
    const agendamentoExistente = await this.agendaMedicoRepository.findByMedicoAndData(medico_id, data_agendamento);
    return !!agendamentoExistente;
  }
}
