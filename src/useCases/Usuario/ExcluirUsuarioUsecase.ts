import { UsuarioRepository } from "../../repositories/UsuarioRepository";

export class ExcluirUsuarioUseCase {
    private usuarioRepository = new UsuarioRepository();

    async execute(id: number) {
        try {
            const usuarioExistente = await this.usuarioRepository.findById(id);

            if (!usuarioExistente) {
                return { error: "Usuário não encontrado" };
            }

            await this.usuarioRepository.delete(id);

            return { message: "Usuário excluído com sucesso" };
        } catch (error) {
            return { error: "Falha ao excluir usuário" };
        }
    }
}
