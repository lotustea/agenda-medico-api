import { PacienteRepository } from "../../repositories/PacienteRepository";

export class ExcluirPacienteUseCase {
    private pacienteRepository = new PacienteRepository();

    async execute(id: number) {
        try {
            const pacienteExistente = await this.pacienteRepository.findById(id);

            if (!pacienteExistente) {
                return { error: "Paciente não encontrado" };
            }

            await this.pacienteRepository.delete(id);

            return { message: "Paciente excluído com sucesso" };
        } catch (error) {
            return { error: "Falha ao excluir paciente" };
        }
    }
}
