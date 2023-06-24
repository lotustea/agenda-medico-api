import { IPessoaFisica } from './IPessoaFisica';

export interface IUsuario {
    id?: number;
    usuario?: string;
    senha?: string;
    perfil?: 'medico' | 'secretaria' | 'paciente';
    pessoaFisica?: IPessoaFisica;
    criado_em?: Date;
    atualizado_em?: Date;
}
