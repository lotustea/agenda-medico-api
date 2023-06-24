import { PacienteRepository } from '../../repositories/PacienteRepository';
import { getPaginationInfo } from '../../utils/getPaginationInfo';

export class ListarPacientesUseCase {
    private authPacienteRepository = new PacienteRepository();

    async execute(page: number, limit: number, paciente: string) {
        try {
            const pacientes = await this.authPacienteRepository.findAll(page, limit, paciente);
            const count = await this.authPacienteRepository.count(page, limit, paciente);

            return { data: pacientes, pagination: getPaginationInfo(page, limit, count) };
        } catch (error) {
            return { error: "Falha ao listar os pacientes" };
        }
    }
}