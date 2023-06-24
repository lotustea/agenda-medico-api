import { MedicoRepository } from '../../repositories/MedicoRepository';
import { getPaginationInfo } from '../../utils/getPaginationInfo';

export class ListarMedicosUseCase {
    private authMedicoRepository = new MedicoRepository();

    async execute(page: number, limit: number, medico: string) {
        try {
            const medicos = await this.authMedicoRepository.findAll(page, limit, medico);
            const count = await this.authMedicoRepository.count(page, limit, medico);

            return { data: medicos, pagination: getPaginationInfo(page, limit, count) };
        } catch (error) {
            return { error: "Falha ao listar os medicos" };
        }
    }
}