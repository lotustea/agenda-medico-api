import { IMedico } from './IMedico';
import { IPaciente } from './IPaciente';

export interface IAgendaMedico {
    id?: number;
    data_agendamento?: Date;
    medico?: IMedico;
    paciente?: IPaciente;
    criado_em?: Date;
    atualizado_em?: Date;
}
