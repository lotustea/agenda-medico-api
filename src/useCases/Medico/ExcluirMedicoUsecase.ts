import { MedicoRepository } from "../../repositories/MedicoRepository";

export class ExcluirMedicoUseCase {
    private medicoRepository = new MedicoRepository();

    async execute(id: number) {
        try {
            const medicoExistente = await this.medicoRepository.findById(id);

            if (!medicoExistente) {
                return { error: "Médico não encontrado" };
            }

            await this.medicoRepository.delete(id);

            return { message: "Médico excluído com sucesso" };
        } catch (error) {
            return { error: "Falha ao excluir médico" };
        }
    }
}
