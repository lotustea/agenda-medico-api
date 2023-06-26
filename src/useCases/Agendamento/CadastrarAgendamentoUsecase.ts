import { AgendamentoRepository } from "../../repositories/AgendamentoRepository";
import { AgendamentoService } from "../../services/AgendamentoService";

export class CadastrarAgendamentoUseCase {
  private agendamentoRepository = new AgendamentoRepository();
  private agendamentoService = new AgendamentoService();

  async execute(data: any) {
    try {
      const { medico_id, data_agendamento } = data;
      const dataAgendamento = new Date(data.data_agendamento);

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
          dataAgendamento
        );

      if (agendamentoExistente) {
        return {
          error: "Já existe um agendamento para o médico nesse horário.",
        };
      }

      const agendamentoSalvo = await this.agendamentoRepository.create({
        ...data,
        data_agendamento: dataAgendamento.toISOString().slice(0, 19)
      });

      return agendamentoSalvo;
    } catch (error: any) {
      console.log(error);
      return { error: "Falha ao cadastrar agendamento" };
    }
  }
}
