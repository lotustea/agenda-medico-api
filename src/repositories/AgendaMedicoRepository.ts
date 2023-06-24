import { BaseRepository } from './BaseRepository';
import { AgendaMedico } from '../entities/AgendaMedico';
import { IAgendaMedicoRepository } from './interfaces/IAgendaMedicoRepository';

export class AgendaMedicoRepository extends BaseRepository<AgendaMedico> implements IAgendaMedicoRepository {
    constructor() {
        super(AgendaMedico);
    }

    async findAll(): Promise<AgendaMedico[]> {
        return await this._repository.find();
    }

    async findById(id: number): Promise<AgendaMedico | undefined> {
        return await this._repository.findOne({where: {id}});
    }

    async create(agendaMedico: AgendaMedico): Promise<AgendaMedico> {
        return await this._repository.save(agendaMedico);
    }

    async update(id: number, agendaMedico: AgendaMedico): Promise<AgendaMedico> {
        await this._repository.update(id, agendaMedico);
        const updatedAgendaMedico = await this._repository.findOne({where: {id}});

        if (!updatedAgendaMedico) {
            throw new Error(`AgendaMedico ${id} não encontrado.`);
        }

        return updatedAgendaMedico;
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this._repository.delete(id);
        return deleteResult.affected !== 0;
    }
}
