import { AgendaMedicoRepository } from "../../repositories/AgendaMedicoRepository";

export class VisualizarAgendaUseCase {
    private authAgendaMedicoRepository = new AgendaMedicoRepository();

    async execute(id: number) {
        try {
            const agenda = await this.authAgendaMedicoRepository.findById(id);

            return { data: agenda };
        } catch (error) {
            return { error: "Falha ao visualizar agenda" };
        }
    }
}
