import { AgendaMedico } from "../../entities/AgendaMedico";

export interface IAgendaMedicoRepository {
    findAll(page: number, limit: number, dataAgendamentoMin: Date, dataAgendamentoMax: Date): Promise<AgendaMedico[]>;
    findById(id: number): Promise<AgendaMedico | undefined>;
    findByMedicoAndData(medicoId: number, dataAgendamento: Date): Promise<AgendaMedico | undefined>
    create(agendaMedico: AgendaMedico): Promise<AgendaMedico>;
    count(page: number, limit: number, dataAgendamentoMin: Date, dataAgendamentoMax: Date): Promise<Number>;
    update(id: number, agendaMedico: AgendaMedico): Promise<AgendaMedico>;
    delete(id: number): Promise<boolean>;
}
