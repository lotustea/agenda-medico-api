import { BaseRepository } from "./BaseRepository";
import { Paciente } from "../entities/Paciente";
import { IPacienteRepository } from "./interfaces/IPacienteRepository";
import { IPaciente } from "../entities/interfaces/IPaciente";

export class PacienteRepository extends BaseRepository<Paciente> implements IPacienteRepository {
  constructor() {
    super(Paciente);
  }

  async findAll(page: number = 1, limit: number = 10, nome: string): Promise<Paciente[]> {
    const query = this._repository
      .createQueryBuilder("paciente")
      .leftJoinAndSelect("paciente.usuario", "usuario")
      .leftJoinAndSelect("usuario.pessoaFisica", "pessoaFisica")
      .leftJoinAndSelect("pessoaFisica.endereco", "endereco")
      .take(limit)
      .skip((page - 1) * limit);
  
    if (nome) {
      query.where("LOWER(paciente.usuario.pessoaFisica.nome) LIKE LOWER(:nome)", {
        nome: `%${nome}%`,
      });
    }
  
    const pacientes = await query.getMany();
  
    return pacientes;
  }
  

  async count(page: number = 1, limit: number = 10, paciente: string): Promise<number> {
    const query = this._repository
      .createQueryBuilder("paciente")
      .leftJoinAndSelect("paciente.usuario", "usuario")
      .leftJoinAndSelect("usuario.pessoaFisica", "pessoaFisica")
      .leftJoinAndSelect("pessoaFisica.endereco", "endereco")
      .take(limit)
      .skip((page - 1) * limit);

    if (paciente) {
      query.where("LOWER(paciente.nome) LIKE LOWER(:paciente)", {
        paciente: `%${paciente}%`,
      });
    }

    return query.getCount();
  }

  async findById(id: number): Promise<Paciente | undefined> {
    return await this._repository
      .createQueryBuilder("paciente")
      .leftJoinAndSelect("paciente.usuario", "usuario")
      .leftJoinAndSelect("usuario.pessoaFisica", "pessoaFisica")
      .leftJoinAndSelect("pessoaFisica.endereco", "endereco")
      .where("paciente.id = :id", { id })
      .getOne();
  }

  async create(paciente: IPaciente): Promise<Paciente> {
    return await this._repository.save(paciente);
  }

  async update(id: number, paciente: IPaciente): Promise<Paciente> {
    const pacienteExistente = await this.findById(id);

    if (!pacienteExistente) {
      throw new Error(`Paciente ${id} não encontrado.`);
    }

    const pacienteAtualizado = this._repository.merge(pacienteExistente, paciente);
    const updatedPaciente = await this._repository.save(pacienteAtualizado);

    return updatedPaciente;
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this._repository.delete(id);
    return deleteResult.affected !== 0;
  }
}
