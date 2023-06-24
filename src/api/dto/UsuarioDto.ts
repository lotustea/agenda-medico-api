import { IUsuario } from './../../entities/interfaces/IUsuario';
import { IPessoaFisica } from '../../entities/interfaces/IPessoaFisica';
import { IEndereco } from '../../entities/interfaces/IEndereco';

export class UsuarioDTO {
  constructor(data: any) {
    this.usuario = data.usuario;
    this.senha = data.senha;
    this.perfil = data.perfil;
    this.cpf = data.cpf;
    this.dataNascimento = data.dataNascimento;
    this.nome = data.nome;
    this.sobrenome = data.sobrenome;
    this.email = data.email;
    this.logradouro = data.logradouro;
    this.numero = data.numero;
    this.cep = data.cep;
    this.cidade = data.cidade;
    this.estado = data.estado;
  }

  usuario?: string;
  senha?: string;
  perfil?: 'medico' | 'secretaria' | 'paciente';
  cpf?: string;
  dataNascimento?: Date;
  nome?: string;
  sobrenome?: string;
  email?: string;
  logradouro?: string;
  numero?: string;
  cep?: string;
  cidade?: string;
  estado?: string;

  toEntity(): IUsuario {
    const endereco: IEndereco = {
      logradouro: this.logradouro,
      numero: this.numero,
      cidade: this.cidade,
      estado: this.estado,
      cep: this.cep
    };

    const pessoaFisica: IPessoaFisica = {
      nome: this.nome,
      sobrenome: this.sobrenome,
      data_nascimento: this.dataNascimento,
      cpf: this.cpf,
      email: this.email,
      endereco: endereco,
    };

    return {
      usuario: this.usuario,
      senha: this.senha,
      perfil: this.perfil,
      pessoaFisica: pessoaFisica,
    }
  }
}
