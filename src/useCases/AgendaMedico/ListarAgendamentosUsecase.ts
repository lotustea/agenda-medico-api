import { AgendaMedicoRepository } from "../../repositories/AgendaMedicoRepository";
import { getPaginationInfo } from "../../utils/getPaginationInfo";

export class ListarAgendamentosUseCase {
    private authAgendaMedicoRepository = new AgendaMedicoRepository();

    async execute(
        page: number,
        limit: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ) {
        try {
            const agendas = await this.authAgendaMedicoRepository.findAll(
                page,
                limit,
                dataAgendamentoMin,
                dataAgendamentoMax
            );
            const count = await this.authAgendaMedicoRepository.count(
                page,
                limit,
                dataAgendamentoMin,
                dataAgendamentoMax
            );

            return {
                data: agendas,
                pagination: getPaginationInfo(page, limit, count),
            };
        } catch (error) {
            return { error: "Falha ao listar os agendas" };
        }
    }
}
