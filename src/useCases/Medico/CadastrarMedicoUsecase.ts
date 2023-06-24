import { MedicoRepository } from './../../repositories/MedicoRepository';
import { UsuarioService } from "../../services/UsuarioService";
import { Medico } from 'entities/Medico';

export class CadastrarMedicoUseCase {
  constructor(
    private usuarioService: UsuarioService,
    private medicoRepository: MedicoRepository
  ) {}

  async execute(data: Medico) {
    try {
      const { usuario } = data;

      const usuarioSalvo = await this.usuarioService.criarUsuario(usuario, usuario.pessoaFisica);
      data.usuario = usuarioSalvo;

      const medicoSalvo = await this.medicoRepository.create(data);

      return { medico: medicoSalvo };
    } catch (error: any) {
      return { error: "Falha ao cadastrar medico" };
    }
  }
}
