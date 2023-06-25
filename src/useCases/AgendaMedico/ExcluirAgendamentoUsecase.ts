import { AgendaMedicoRepository } from "../../repositories/AgendaMedicoRepository";

export class ExcluirAgendamentoUseCase {
    private authAgendaMedicoRepository = new AgendaMedicoRepository();

    async execute(id: number) {
        try {
            await this.authAgendaMedicoRepository.delete(id);

            return { message: "Agenda excluida com sucesso" };
        } catch (error) {
            return { error: "Falha ao excluir agenda" };
        }
    }
}
