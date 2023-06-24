import { Medico } from "../../entities/Medico";

export interface IMedicoRepository {
    findAll(page: number, limit: number, nome: string): Promise<Medico[]> ;
    findById(id: number): Promise<Medico | undefined>;
    create(medico: Medico): Promise<Medico>;
    count(page: number, limit: number, nome: string): Promise<Number> 
    update(id: number, medico: Medico): Promise<Medico>;
    delete(id: number): Promise<boolean>;
}
