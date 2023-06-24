import { PacienteRepository } from './../../repositories/PacienteRepository';
import { UsuarioService } from "../../services/UsuarioService";
import { Paciente } from 'entities/Paciente';

export class CadastrarPacienteUseCase {
  constructor(
    private usuarioService: UsuarioService,
    private pacienteRepository: PacienteRepository
  ) {}

  async execute(data: Paciente) {
    try {
      const { usuario } = data;

      const usuarioSalvo = await this.usuarioService.criarUsuario(usuario, usuario.pessoaFisica);
      data.usuario = usuarioSalvo;

      const pacienteSalvo = await this.pacienteRepository.create(data);

      return { paciente: pacienteSalvo };
    } catch (error: any) {
      return { error: "Falha ao cadastrar paciente" };
    }
  }
}
