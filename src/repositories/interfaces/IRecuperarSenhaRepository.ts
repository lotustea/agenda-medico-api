import { IRecuperarSenha } from '../../entities/interfaces/IRecuperarSenha';
import { RecuperarSenha } from './../../entities/RecuperarSenha';

export interface IRecuperarSenhaRepository {
    findByTokenAndUsuario(token: string, usuarioId: number): Promise<RecuperarSenha | undefined>;
    create(recuperarSenha: IRecuperarSenha): Promise<RecuperarSenha>;
    delete(id: number): Promise<boolean>;
}
