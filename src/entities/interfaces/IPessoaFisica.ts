import { IEndereco } from './IEndereco';

export interface IPessoaFisica {
    id?: number;
    nome?: string;
    sobrenome?: string;
    data_nascimento?: Date;
    cpf?: string;
    email?: string;
    endereco?: IEndereco;
    criado_em?: Date;
    atualizado_em?: Date;
}
