import { Agendamento } from "../../entities/Agendamento";

export interface IAgendamentoRepository {
    findAll(
        page: number,
        limit: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<Agendamento[]>;
    findAllByMedico(
        medicoId: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<Agendamento[]>;
    findAllByPaciente(
        pacienteId: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<Agendamento[]>;
    findById(id: number): Promise<Agendamento | undefined>;
    findByMedicoAndData(
        medicoId: number,
        dataAgendamento: Date
    ): Promise<Agendamento | undefined>;
    create(agendamento: Agendamento): Promise<Agendamento>;
    count(
        page: number,
        limit: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<Number>;
    update(id: number, agendamento: Agendamento): Promise<Agendamento>;
    delete(id: number): Promise<boolean>;
}
