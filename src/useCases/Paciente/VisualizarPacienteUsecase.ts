import { PacienteRepository } from "../../repositories/PacienteRepository";

export class VisualizarPacienteUseCase {
    private pacienteRepository = new PacienteRepository();

    async execute(id: number) {
        try {
            const paciente = await this.pacienteRepository.findById(id);

            if (!paciente) {
                return { error: "Paciente não encontrado" };
            }

            return { data: paciente };
        } catch (error) {
            return { error: "Falha ao visualizar paciente" };
        }
    }
}
