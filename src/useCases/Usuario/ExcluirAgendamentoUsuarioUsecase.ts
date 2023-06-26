import { Usuario } from "entities/Usuario";
import { AgendamentoRepository } from "../../repositories/AgendamentoRepository";

export class ExcluirAgendamentoUsuarioUseCase {
  private authAgendamentoRepository = new AgendamentoRepository();

  async execute(id: number, usuario: Usuario) {
    try {
      const methodMap = {
        medico: this.authAgendamentoRepository.findByIdAndMedico,
        paciente: this.authAgendamentoRepository.findByIdAndPaciente,
      };

      const deleteMethod = methodMap[usuario.perfil];

      if (!deleteMethod) {
        return { error: "Perfil inválido para excluir agendamento" };
      }

      const agendamento = await deleteMethod(
        this.authAgendamentoRepository,
        id,
        usuario.id
      );

      if (agendamento) {
        await this.authAgendamentoRepository.delete(id);
        return { message: "Agendamento excluído com sucesso" };
      }

      return { error: "Agendamento não encontrado para esse perfil" };
    } catch (error) {
      return { error: "Falha ao excluir agendamento" };
    }
  }
}
