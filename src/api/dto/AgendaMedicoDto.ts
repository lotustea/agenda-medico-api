export class AgendaMedicoDTO {
  constructor(data: any) {
    this.medicoId = data.medicoId;
    this.pacienteId = data.pacienteId;
    this.dataAgendamento = data.dataAgendamento;
  }

  medicoId?: number;
  pacienteId?: number;
  dataAgendamento?: Date;

  toEntity() {
    return {
      medico_id: this.medicoId,
      paciente_id: this.pacienteId,
      data_agendamento: this.dataAgendamento,
    }
  }
}
