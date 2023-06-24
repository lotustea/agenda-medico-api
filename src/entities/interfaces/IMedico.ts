import { IUsuario } from './IUsuario';

export interface IMedico {
    id?: number;
    especialidade?: string;
    usuario?: IUsuario;
    criado_em?: Date;
    atualizado_em?: Date;
}
