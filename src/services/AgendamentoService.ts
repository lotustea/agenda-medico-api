import { Agendamento } from "../entities/Agendamento";
import { AgendamentoRepository } from "../repositories/AgendamentoRepository";

export class AgendamentoService {
  private agendamentoRepository = new AgendamentoRepository();

  async verificarHorarioAgendamento(data_agendamento: Date): Promise<boolean> {
    const horaInicio = new Date(data_agendamento).setHours(8, 0, 0, 0);
    const horaFim = new Date(data_agendamento).setHours(17, 0, 0, 0);
    const horarioAgendamento = new Date(data_agendamento).getTime();

    return horarioAgendamento >= horaInicio && horarioAgendamento <= horaFim;
  }

  async verificarAgendamentoExistente(medico_id: number, data_agendamento: Date): Promise<Agendamento | undefined> {
    const agendamentoExistente = await this.agendamentoRepository.findByMedicoAndData(
      medico_id,
      new Date(data_agendamento.toISOString().slice(0, 19))
    );
    return agendamentoExistente;
  }
}
