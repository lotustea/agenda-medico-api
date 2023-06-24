import { BaseRepository } from './BaseRepository';
import { Usuario } from '../entities/Usuario';
import { IUsuarioRepository } from './interfaces/IUsuarioRepository';

export class UsuarioRepository extends BaseRepository<Usuario> implements IUsuarioRepository {
    constructor() {
        super(Usuario);
    }

    async findAll(): Promise<Usuario[]> {
        return await this._repository.find();
    }

    async findById(id: number): Promise<Usuario | undefined> {
        return await this._repository.findOne({where: {id}});
    }

    async create(usuario: Usuario): Promise<Usuario> {
        return await this._repository.save(usuario);
    }

    async update(id: number, usuario: Usuario): Promise<Usuario> {
        await this._repository.update(id, usuario);
        const updatedUsuario = await this._repository.findOne({where: {id}});

        if (!updatedUsuario) {
            throw new Error(`Usuario ${id} não encontrado.`);
        }

        return updatedUsuario;
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this._repository.delete(id);
        return deleteResult.affected !== 0;
    }
}
