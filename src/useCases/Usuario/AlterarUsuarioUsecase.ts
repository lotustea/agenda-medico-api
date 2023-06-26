import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { IUsuario } from "../../entities/interfaces/IUsuario";
import { getPasswordHash } from "../../utils/getPasswordHash";
import { removeUndefined } from "../../utils/removeUndefined";

export class AlterarUsuarioUseCase {
    private usuarioRepository = new UsuarioRepository();

    async execute(id: number, usuarioData: IUsuario) {
        try {
            const usuarioExistente = await this.usuarioRepository.findById(id);
            if (!usuarioExistente) {
                return { error: "Usuário não encontrado" };
            }
            if (usuarioData.senha) {
                usuarioData.senha = await getPasswordHash(usuarioData.senha);
            }

            const usuarioAtualizado: IUsuario = removeUndefined(usuarioData);

            const usuarioSalvo = await this.usuarioRepository.update(
                id,
                usuarioAtualizado
            );

            return { usuario: usuarioSalvo };
        } catch (error: any) {
            console.log(error);
            return { error: "Falha ao alterar usuário" };
        }
    }
}
