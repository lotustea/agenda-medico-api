import { PessoaFisica } from "entities/PessoaFisica";
import { Usuario } from "../entities/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { IUsuario } from "entities/interfaces/IUsuario";
import { PessoaFisicaService } from "./PessoaFisicaService";

export class UsuarioService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private pessoaFisicaService: PessoaFisicaService
    ) {}

  async criarUsuario(usuarioData: IUsuario, pessoaFisica: PessoaFisica) {
    const pessoaFisicaSalva = await this.pessoaFisicaService.criarPessoaFisica(pessoaFisica, pessoaFisica.endereco);

    const usuario = new Usuario();
    usuario.usuario = usuarioData.usuario;
    usuario.senha = usuarioData.senha;
    usuario.perfil = usuarioData.perfil;
    usuario.pessoaFisica = pessoaFisicaSalva;

    const usuarioSalvo = await this.usuarioRepository.create(usuario);
    return usuarioSalvo;
  }
}
