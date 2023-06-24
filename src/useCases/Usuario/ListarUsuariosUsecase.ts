import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import { getPaginationInfo } from '../../utils/getPaginationInfo';

export class ListarUsuariosUseCase {
    private authUsuarioRepository = new UsuarioRepository();

    async execute(page: number, limit: number, usuario: string) {
        try {
            const usuarios = await this.authUsuarioRepository.findAll(page, limit, usuario);
            const count = await this.authUsuarioRepository.count(page, limit, usuario);

            return { data: usuarios, pagination: getPaginationInfo(page, limit, count) };
        } catch (error) {
            return { error: "Falha ao listar os usuarios" };
        }
    }
}