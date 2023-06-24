import { Medico } from "../../entities/Medico";

export interface IMedicoRepository {
    findAll(): Promise<Medico[]>;
    findById(id: number): Promise<Medico | undefined>;
    create(medico: Medico): Promise<Medico>;
    update(id: number, medico: Medico): Promise<Medico>;
    delete(id: number): Promise<boolean>;
}
