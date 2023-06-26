import { AgendamentoRepository } from "../../repositories/AgendamentoRepository";

export class VisualizarAgendaUseCase {
    private authAgendamentoRepository = new AgendamentoRepository();

    async execute(id: number) {
        try {
            const agenda = await this.authAgendamentoRepository.findById(id);

            return { data: agenda };
        } catch (error) {
            return { error: "Falha ao visualizar agenda" };
        }
    }
}
