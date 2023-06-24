import { Paciente } from "../../entities/Paciente";

export interface IPacienteRepository {
    findAll(): Promise<Paciente[]>;
    findById(id: number): Promise<Paciente | undefined>;
    create(paciente: Paciente): Promise<Paciente>;
    update(id: number, paciente: Paciente): Promise<Paciente>;
    delete(id: number): Promise<boolean>;
}
