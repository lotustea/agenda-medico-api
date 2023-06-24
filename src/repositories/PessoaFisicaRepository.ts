import { BaseRepository } from './BaseRepository';
import { PessoaFisica } from '../entities/PessoaFisica';
import { IPessoaFisicaRepository } from './interfaces/IPessoaFisicaRepository';

export class PessoaFisicaRepository extends BaseRepository<PessoaFisica> implements IPessoaFisicaRepository {
    constructor() {
        super(PessoaFisica);
    }

    async findAll(): Promise<PessoaFisica[]> {
        return await this._repository.find();
    }

    async findById(id: number): Promise<PessoaFisica | undefined> {
        return await this._repository.findOne({where: {id}});
    }

    async create(pessoaFisica: PessoaFisica): Promise<PessoaFisica> {
        return await this._repository.save(pessoaFisica);
    }

    async update(id: number, pessoaFisica: PessoaFisica): Promise<PessoaFisica> {
        await this._repository.update(id, pessoaFisica);
        const updatedPessoaFisica = await this._repository.findOne({where: {id}});

        if (!updatedPessoaFisica) {
            throw new Error(`PessoaFisica ${id} não encontrado.`);
        }

        return updatedPessoaFisica;
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this._repository.delete(id);
        return deleteResult.affected !== 0;
    }
}
