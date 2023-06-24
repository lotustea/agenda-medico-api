import { UsuarioService } from "../../services/UsuarioService";
import { PessoaFisicaService } from "../../services/PessoaFisicaService";

export class CadastrarUsuarioUseCase {
  constructor(
    private usuarioService: UsuarioService,
  ) {}

  async execute(data: any) {
    try {
      const { usuario, senha, perfil, pessoaFisica } = data;
      const usuarioSalvo = await this.usuarioService.criarUsuario(
        { usuario, senha, perfil },
        pessoaFisica
      );

      return { usuario: usuarioSalvo };
    } catch (error: any) {
      return { error: "Falha ao cadastrar usuário" };
    }
  }
}
