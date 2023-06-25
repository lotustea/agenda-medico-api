import { RecuperarSenhaRepository } from "../../repositories/RecuperarSenhaRepository";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { AlterarUsuarioUseCase } from "./AlterarUsuarioUsecase";

export class RecuperarSenhaUseCase {
  private usuarioRepository = new UsuarioRepository();
  private recuperarSenhaRepository = new RecuperarSenhaRepository();

  async execute(usuario: string, token: string, senha: string) {
    try {
      const usuarioExistente = await this.usuarioRepository.findByUsuario(usuario);

      if (!usuarioExistente) {
        return { error: "Usuario inexistente" };
      }

      const recuperarSenha =
        await this.recuperarSenhaRepository.findByTokenAndUsuario(token, usuarioExistente.id);

      if (!recuperarSenha) {
        return { error: "Token inválido" };
      }

      const currentTime = new Date().getTime();
      const tokenExpirationTime = recuperarSenha.criado_em.getTime();
      const tokenTimeLimit = tokenExpirationTime * 60 * 1000; // convert minutes to milliseconds
      const tokenCreationTime = recuperarSenha.criado_em.getTime();
      const elapsedTime = currentTime - tokenCreationTime;

      if (elapsedTime > tokenTimeLimit) {
        return { error: "Token expirado" };
      }

      await new AlterarUsuarioUseCase().execute(usuarioExistente.id, { senha });

      return { message: 'Senha alterada com sucesso' };
    } catch (error: any) {
      return { error: "Falha ao recuperar senha" };
    }
  }
}
