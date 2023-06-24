import { BaseRepository } from "./BaseRepository";
import { Medico } from "../entities/Medico";
import { IMedicoRepository } from "./interfaces/IMedicoRepository";
import { IMedico } from "../entities/interfaces/IMedico";

export class MedicoRepository extends BaseRepository<Medico> implements IMedicoRepository {
  constructor() {
    super(Medico);
  }

  async findAll(page: number = 1, limit: number = 10, nome: string): Promise<Medico[]> {
    const query = this._repository
      .createQueryBuilder("medico")
      .leftJoinAndSelect("medico.usuario", "usuario")
      .leftJoinAndSelect("usuario.pessoaFisica", "pessoaFisica")
      .leftJoinAndSelect("pessoaFisica.endereco", "endereco")
      .take(limit)
      .skip((page - 1) * limit);
  
    if (nome) {
      query.where("LOWER(medico.usuario.pessoaFisica.nome) LIKE LOWER(:nome)", {
        nome: `%${nome}%`,
      });
    }
  
    const medicos = await query.getMany();
  
    return medicos;
  }
  

  async count(page: number = 1, limit: number = 10, medico: string): Promise<number> {
    const query = this._repository
      .createQueryBuilder("medico")
      .leftJoinAndSelect("medico.usuario", "usuario")
      .leftJoinAndSelect("usuario.pessoaFisica", "pessoaFisica")
      .leftJoinAndSelect("pessoaFisica.endereco", "endereco")
      .take(limit)
      .skip((page - 1) * limit);

    if (medico) {
      query.where("LOWER(medico.nome) LIKE LOWER(:medico)", {
        medico: `%${medico}%`,
      });
    }

    return query.getCount();
  }

  async findById(id: number): Promise<Medico | undefined> {
    return await this._repository
      .createQueryBuilder("medico")
      .leftJoinAndSelect("medico.usuario", "usuario")
      .leftJoinAndSelect("usuario.pessoaFisica", "pessoaFisica")
      .leftJoinAndSelect("pessoaFisica.endereco", "endereco")
      .where("medico.id = :id", { id })
      .getOne();
  }

  async create(medico: IMedico): Promise<Medico> {
    return await this._repository.save(medico);
  }

  async update(id: number, medico: IMedico): Promise<Medico> {
    const medicoExistente = await this.findById(id);

    if (!medicoExistente) {
      throw new Error(`Medico ${id} não encontrado.`);
    }

    const medicoAtualizado = this._repository.merge(medicoExistente, medico);
    const updatedMedico = await this._repository.save(medicoAtualizado);

    return updatedMedico;
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this._repository.delete(id);
    return deleteResult.affected !== 0;
  }
}
