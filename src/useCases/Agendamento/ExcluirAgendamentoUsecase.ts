import { AgendamentoRepository } from "../../repositories/AgendamentoRepository";

export class ExcluirAgendamentoUseCase {
    private authAgendamentoRepository = new AgendamentoRepository();

    async execute(id: number) {
        try {
            await this.authAgendamentoRepository.delete(id);

            return { message: "Agenda excluida com sucesso" };
        } catch (error) {
            return { error: "Falha ao excluir agenda" };
        }
    }
}
