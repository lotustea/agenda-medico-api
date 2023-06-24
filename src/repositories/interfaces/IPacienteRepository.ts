import { Paciente } from "../../entities/Paciente";

export interface IPacienteRepository {
    findAll(page: number, limit: number, nome: string): Promise<Paciente[]>;
    findById(id: number): Promise<Paciente | undefined>;
    count(page: number, limit: number, nome: string): Promise<Number>;
    create(paciente: Paciente): Promise<Paciente>;
    update(id: number, paciente: Paciente): Promise<Paciente>;
    delete(id: number): Promise<boolean>;
}
