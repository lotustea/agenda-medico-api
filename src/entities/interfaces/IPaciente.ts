import { IUsuario } from './IUsuario';

export interface IPaciente {
    id?: number;
    enfermidade?: string;
    usuario?: IUsuario;
    criado_em?: Date;
    atualizado_em?: Date;
}
