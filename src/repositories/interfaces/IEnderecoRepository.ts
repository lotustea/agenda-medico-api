import { Endereco } from "../../entities/Endereco";

export interface IEnderecoRepository {
    findAll(): Promise<Endereco[]>;
    findById(id: number): Promise<Endereco | undefined>;
    create(endereco: Endereco): Promise<Endereco>;
    update(id: number, endereco: Endereco): Promise<Endereco>;
    delete(id: number): Promise<boolean>;
}
