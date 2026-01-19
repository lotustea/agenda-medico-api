import { PacienteRepository } from "../../repositories/PacienteRepository";
import { IPaciente } from "../../entities/interfaces/IPaciente";

export class AlterarPacienteUseCase {
    private pacienteRepository = new PacienteRepository();

    async execute(id: number, pacienteData: Partial<IPaciente>) {
        try {
            const pacienteExistente = await this.pacienteRepository.findById(id);

            if (!pacienteExistente) {
                return { error: "Paciente não encontrado" };
            }

            const pacienteAtualizado = await this.pacienteRepository.update(id, pacienteData);

            return { paciente: pacienteAtualizado };
        } catch (error) {
            return { error: "Falha ao alterar paciente" };
        }
    }
}
