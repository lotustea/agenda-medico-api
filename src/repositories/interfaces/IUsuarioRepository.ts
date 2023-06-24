import { Usuario } from "../../entities/Usuario";

export interface IUsuarioRepository {
    findAll(page: number, limit: number, usuario: string): Promise<Usuario[]>;
    findById(id: number): Promise<Usuario | undefined>;
    count(page: number, limit: number, usuario: string): Promise<Number>;
    create(usuario: Usuario): Promise<Usuario>;
    update(id: number, usuario: Usuario): Promise<Usuario>;
    delete(id: number): Promise<boolean>;
}
