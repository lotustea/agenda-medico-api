import { PessoaFisica } from "../entities/PessoaFisica";
import { Endereco } from "../entities/Endereco";
import { PessoaFisicaRepository } from "../repositories/PessoaFisicaRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { IPessoaFisica } from "../entities/interfaces/IPessoaFisica";
import { IEndereco } from "../entities/interfaces/IEndereco";

export class PessoaFisicaService {
  private pessoaFisicaRepository = new PessoaFisicaRepository();
  private enderecoRepository = new EnderecoRepository();
  
  async criarPessoaFisica(pessoaFisicaData: IPessoaFisica, enderecoData: IEndereco) {
    const endereco = new Endereco();
    endereco.logradouro = enderecoData.logradouro;
    endereco.numero = enderecoData.numero;
    endereco.cep = enderecoData.cep;
    endereco.cidade = enderecoData.cidade;
    endereco.estado = enderecoData.estado;

    const enderecoSalvo = await this.enderecoRepository.create(endereco);

    const pessoaFisica = new PessoaFisica();
    pessoaFisica.nome = pessoaFisicaData.nome;
    pessoaFisica.sobrenome = pessoaFisicaData.sobrenome;
    pessoaFisica.data_nascimento = pessoaFisicaData.data_nascimento;
    pessoaFisica.cpf = pessoaFisicaData.cpf;
    pessoaFisica.email = pessoaFisicaData.email;
    pessoaFisica.endereco = enderecoSalvo;

    const pessoaFisicaSalva = await this.pessoaFisicaRepository.create(pessoaFisica);
    return pessoaFisicaSalva;
  }
}
