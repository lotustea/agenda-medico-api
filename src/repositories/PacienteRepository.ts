import { BaseRepository } from './BaseRepository';
import { Paciente } from '../entities/Paciente';
import { IPacienteRepository } from './interfaces/IPacienteRepository';

export class PacienteRepository extends BaseRepository<Paciente> implements IPacienteRepository {
    constructor() {
        super(Paciente);
    }

    async findAll(): Promise<Paciente[]> {
        return await this._repository.find();
    }

    async findById(id: number): Promise<Paciente | undefined> {
        return await this._repository.findOne({where: {id}});
    }

    async create(paciente: Paciente): Promise<Paciente> {
        return await this._repository.save(paciente);
    }

    async update(id: number, paciente: Paciente): Promise<Paciente> {
        await this._repository.update(id, paciente);
        const updatedPaciente = await this._repository.findOne({where: {id}});

        if (!updatedPaciente) {
            throw new Error(`Paciente ${id} não encontrado.`);
        }

        return updatedPaciente;
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this._repository.delete(id);
        return deleteResult.affected !== 0;
    }
}
