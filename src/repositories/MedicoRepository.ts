import { BaseRepository } from './BaseRepository';
import { Medico } from '../entities/Medico';
import { IMedicoRepository } from './interfaces/IMedicoRepository';

export class MedicoRepository extends BaseRepository<Medico> implements IMedicoRepository {
    constructor() {
        super(Medico);
    }

    async findAll(): Promise<Medico[]> {
        return await this._repository.find();
    }

    async findById(id: number): Promise<Medico | undefined> {
        return await this._repository.findOne({where: {id}});
    }

    async create(medico: Medico): Promise<Medico> {
        return await this._repository.save(medico);
    }

    async update(id: number, medico: Medico): Promise<Medico> {
        await this._repository.update(id, medico);
        const updatedMedico = await this._repository.findOne({where: {id}});

        if (!updatedMedico) {
            throw new Error(`Medico ${id} não encontrado.`);
        }

        return updatedMedico;
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this._repository.delete(id);
        return deleteResult.affected !== 0;
    }
}
