import { PessoaFisica } from "../../entities/PessoaFisica";

export interface IPessoaFisicaRepository {
    findAll(): Promise<PessoaFisica[]>;
    findById(id: number): Promise<PessoaFisica | undefined>;
    create(pessoaFisica: PessoaFisica): Promise<PessoaFisica>;
    update(id: number, pessoaFisica: PessoaFisica): Promise<PessoaFisica>;
    delete(id: number): Promise<boolean>;
}
