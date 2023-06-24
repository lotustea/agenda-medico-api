import { BaseRepository } from "./BaseRepository";
import { Usuario } from "../entities/Usuario";
import { IUsuarioRepository } from "./interfaces/IUsuarioRepository";
import { IUsuario } from "entities/interfaces/IUsuario";

export class UsuarioRepository
  extends BaseRepository<Usuario>
  implements IUsuarioRepository
{
  constructor() {
    super(Usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this._repository.find();
  }

  async findById(id: number): Promise<Usuario | undefined> {
    return await this._repository
      .createQueryBuilder("usuario")
      .leftJoinAndSelect("usuario.pessoaFisica", "pessoaFisica")
      .leftJoinAndSelect("pessoaFisica.endereco", "endereco")
      .where("usuario.id = :id", { id })
      .getOne();
  }

  async create(usuario: Usuario): Promise<Usuario> {
    return await this._repository.save(usuario);
  }

  async update(id: number, usuario: IUsuario): Promise<Usuario> {
    const usuarioExistente = await this.findById(id);

    if (!usuarioExistente) {
      throw new Error(`Usuário ${id} não encontrado.`);
    }

    const usuarioAtualizado = this._repository.merge(usuarioExistente, usuario);
    const updatedUsuario = await this._repository.save(usuarioAtualizado);

    return updatedUsuario;
  }
  async delete(id: number): Promise<boolean> {
    const deleteResult = await this._repository.delete(id);
    return deleteResult.affected !== 0;
  }
}
