import { AgendamentoRepository } from "../../repositories/AgendamentoRepository";
import { getPaginationInfo } from "../../utils/getPaginationInfo";

export class ListarAgendamentosUseCase {
    private authAgendamentoRepository = new AgendamentoRepository();

    async execute(
        page: number,
        limit: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ) {
        try {
            const agendas = await this.authAgendamentoRepository.findAll(
                page,
                limit,
                dataAgendamentoMin,
                dataAgendamentoMax
            );
            const count = await this.authAgendamentoRepository.count(
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
