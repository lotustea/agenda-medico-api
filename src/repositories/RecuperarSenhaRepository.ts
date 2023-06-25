import { BaseRepository } from "./BaseRepository";
import { RecuperarSenha } from "../entities/RecuperarSenha";
import { IRecuperarSenhaRepository } from "./interfaces/IRecuperarSenhaRepository";
import { IRecuperarSenha } from "../entities/interfaces/IRecuperarSenha";

export class RecuperarSenhaRepository
  extends BaseRepository<RecuperarSenha>
  implements IRecuperarSenhaRepository {
  constructor() {
    super(RecuperarSenha);
  }

  async findByTokenAndUsuario(token: string, usuarioId: number): Promise<RecuperarSenha | undefined> {
    return await this._repository.findOne({ where: { token, usuario_id: usuarioId } });
  }

  async findByUsuario(usuarioId: number): Promise<RecuperarSenha | undefined> {
    return await this._repository.findOne({ where: { usuario_id: usuarioId }, order: { criado_em: 'DESC' } });
  }

  async create(recuperarSenha: IRecuperarSenha): Promise<RecuperarSenha> {
    return await this._repository.save(recuperarSenha);
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this._repository.delete(id);
    return deleteResult.affected !== 0;
  }
}
