export class AgendamentoDTO {
  constructor(data: any) {
    this.medicoId = data.medicoId;
    this.pacienteId = data.pacienteId;
    this.dataAgendamento = data.dataAgendamento ? new Date(data.dataAgendamento) : undefined;
  }

  medicoId?: number;
  pacienteId?: number;
  dataAgendamento?: Date;

  toEntity() {
    return {
      medico_id: this.medicoId,
      paciente_id: this.pacienteId,
      data_agendamento: new Date(this.dataAgendamento).toISOString().slice(0, 16),
    }
  }
}
