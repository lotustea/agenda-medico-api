import { generateToken } from "../../utils/generateToken";
import { RecuperarSenhaRepository } from "../../repositories/RecuperarSenhaRepository";
import { UsuarioRepository } from "../../repositories/UsuarioRepository";
import { EnviarTokenRecuperarSenhaMail } from "../../jobs/mail/EnviarTokenRecuperarSenhaMail";

export class GerarTokenRecuperarSenhaUseCase {
  private usuarioRepository = new UsuarioRepository();
  private recuperarSenhaRepository = new RecuperarSenhaRepository();

  async execute(usuario: string) {
    try {
      const usuarioExistente = await this.usuarioRepository.findByUsuario(usuario);

      if (!usuarioExistente) {
        return { error: "Usuario inexistente" };
      }

      const recuperarSenhaExistente = await this.recuperarSenhaRepository.findByUsuario(usuarioExistente.id);

      if (recuperarSenhaExistente) {
        const currentTime = new Date().getTime();
        const lastTokenTime = recuperarSenhaExistente.criado_em.getTime();
        const elapsedTime = (currentTime - lastTokenTime) / 1000;

        if (elapsedTime < 180) {
          return { error: "Aguarde 3 minutos antes de gerar um novo token" };
        }
      }

      const token = generateToken();

      await this.recuperarSenhaRepository.create({ usuario_id: usuarioExistente.id, token });

      new EnviarTokenRecuperarSenhaMail().enviar({
        email: usuarioExistente.pessoaFisica.email,
        name: usuarioExistente.usuario,
        token: token,
        tokenExpirationTime: '3'
      });

      return { message: 'Token gerado com sucesso' };
    } catch (error: any) {
      console.log(error);
      return { error: "Falha ao gerar token" };
    }
  }
}
