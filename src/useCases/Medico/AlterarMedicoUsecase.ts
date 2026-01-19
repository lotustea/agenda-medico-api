import { MedicoRepository } from "../../repositories/MedicoRepository";
import { IMedico } from "../../entities/interfaces/IMedico";

export class AlterarMedicoUseCase {
    private medicoRepository = new MedicoRepository();

    async execute(id: number, medicoData: Partial<IMedico>) {
        try {
            const medicoExistente = await this.medicoRepository.findById(id);

            if (!medicoExistente) {
                return { error: "Médico não encontrado" };
            }

            const medicoAtualizado = await this.medicoRepository.update(id, medicoData);

            return { medico: medicoAtualizado };
        } catch (error) {
            return { error: "Falha ao alterar médico" };
        }
    }
}
