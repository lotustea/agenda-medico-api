import { IMedico } from './IMedico';
import { IPaciente } from './IPaciente';

export interface IAgendamento {
    id?: number;
    data_agendamento?: Date;
    medico_id?: number;
    paciente_id?: number;
    medico?: IMedico;
    paciente?: IPaciente;
    criado_em?: Date;
    atualizado_em?: Date;
}
