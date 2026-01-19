import { MedicoRepository } from "../../repositories/MedicoRepository";

export class VisualizarMedicoUseCase {
    private medicoRepository = new MedicoRepository();

    async execute(id: number) {
        try {
            const medico = await this.medicoRepository.findById(id);

            if (!medico) {
                return { error: "Médico não encontrado" };
            }

            return { data: medico };
        } catch (error) {
            return { error: "Falha ao visualizar médico" };
        }
    }
}
