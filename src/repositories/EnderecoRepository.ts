import { BaseRepository } from "./BaseRepository";
import { Endereco } from "../entities/Endereco";
import { IEnderecoRepository } from "./interfaces/IEnderecoRepository";
import { IEndereco } from "entities/interfaces/IEndereco";

export class EnderecoRepository
  extends BaseRepository<Endereco>
  implements IEnderecoRepository
{
  constructor() {
    super(Endereco);
  }

  async findAll(): Promise<Endereco[]> {
    return await this._repository.find();
  }

  async findById(id: number): Promise<Endereco | undefined> {
    return await this._repository.findOne({ where: { id } });
  }

  async create(endereco: Endereco): Promise<Endereco> {
    return await this._repository.save(endereco);
  }

  async update(id: number, endereco: IEndereco): Promise<Endereco> {
    await this._repository.update(id, endereco);
    const updatedEndereco = await this._repository.findOne({ where: { id } });

    if (!updatedEndereco) {
      throw new Error(`Endereco ${id} não encontrado.`);
    }

    return updatedEndereco;
  }

  async delete(id: number): Promise<boolean> {
    const deleteResult = await this._repository.delete(id);
    return deleteResult.affected !== 0;
  }
}
