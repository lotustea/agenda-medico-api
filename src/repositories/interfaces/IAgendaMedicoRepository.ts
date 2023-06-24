import { AgendaMedico } from "../../entities/AgendaMedico";

export interface IAgendaMedicoRepository {
    findAll(): Promise<AgendaMedico[]>;
    findById(id: number): Promise<AgendaMedico | undefined>;
    create(agendaMedico: AgendaMedico): Promise<AgendaMedico>;
    update(id: number, agendaMedico: AgendaMedico): Promise<AgendaMedico>;
    delete(id: number): Promise<boolean>;
}
