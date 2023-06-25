import { Usuario } from "entities/Usuario";
import { AgendaMedicoRepository } from "../../repositories/AgendaMedicoRepository";

export class ExcluirAgendamentoUsuarioUseCase {
  private authAgendaMedicoRepository = new AgendaMedicoRepository();

  async execute(id: number, usuario: Usuario) {
    try {
      const methodMap = {
        medico: this.authAgendaMedicoRepository.findByIdAndMedico,
        paciente: this.authAgendaMedicoRepository.findByIdAndPaciente,
      };

      const deleteMethod = methodMap[usuario.perfil];

      if (!deleteMethod) {
        return { error: "Perfil inválido para excluir agendamento" };
      }

      const agendamento = await deleteMethod(
        this.authAgendaMedicoRepository,
        id,
        usuario.id
      );

      if (agendamento) {
        await this.authAgendaMedicoRepository.delete(id);
        return { message: "Agendamento excluído com sucesso" };
      }

      return { error: "Agendamento não encontrado para esse perfil" };
    } catch (error) {
      return { error: "Falha ao excluir agendamento" };
    }
  }
}
