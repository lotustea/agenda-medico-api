import { BaseRepository } from "./BaseRepository";
import { Agendamento } from "../entities/Agendamento";
import { IAgendamentoRepository } from "./interfaces/IAgendamentoRepository";
import { IAgendamento } from "../entities/interfaces/IAgendamento";

export class AgendamentoRepository
    extends BaseRepository<Agendamento>
    implements IAgendamentoRepository {
    constructor() {
        super(Agendamento);
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        dataAgendamentoMin: Date | null,
        dataAgendamentoMax: Date | null
    ): Promise<Agendamento[]> {
        const query = this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .leftJoinAndSelect("agendamento.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .take(limit)
            .skip((page - 1) * limit);

        if (dataAgendamentoMin) {
            query.andWhere("agendamento.data_agendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin: dataAgendamentoMin.toISOString().slice(0, 19)
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendamento.data_agendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax: dataAgendamentoMax.toISOString().slice(0, 19)
            });
        }

        const agendamentos = await query.getMany();

        return agendamentos;
    }

    async findAllByMedico(
        medicoId: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<Agendamento[]> {
        const query = this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.medico", "medico")
            .leftJoinAndSelect("agendamento.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .where("medico.id = :medicoId", { medicoId });

        if (dataAgendamentoMin) {
            query.andWhere("agendamento.dataAgendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin,
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendamento.dataAgendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax,
            });
        }

        const agendamentos = await query.getMany();

        return agendamentos;
    }

    async findAllByPaciente(
        pacienteId: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<Agendamento[]> {
        const query = this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.paciente", "paciente")
            .leftJoinAndSelect("agendamento.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .where("paciente.id = :pacienteId", { pacienteId });

        if (dataAgendamentoMin) {
            query.andWhere("agendamento.data_agendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin,
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendamento.data_agendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax,
            });
        }

        const agendamentos = await query.getMany();

        return agendamentos;
    }

    async count(
        page: number = 1,
        limit: number = 10,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<number> {
        const query = this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .leftJoinAndSelect("agendamento.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .take(limit)
            .skip((page - 1) * limit);

        if (dataAgendamentoMin) {
            query.andWhere("agendamento.data_agendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin,
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendamento.data_agendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax,
            });
        }

        return query.getCount();
    }

    async findById(id: number): Promise<Agendamento | undefined> {
        return await this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .leftJoinAndSelect("agendamento.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .where("agendamento.id = :id", { id })
            .getOne();
    }

    async findByMedicoAndData(
        medicoId: number,
        dataAgendamento: Date
    ): Promise<Agendamento | undefined> {
        return await this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.medico", "medico")
            .where("medico.id = :medicoId", { medicoId })
            .andWhere("DATE_FORMAT(agendamento.data_agendamento, '%Y-%m-%d %H:%i') = :dataAgendamento", {
                dataAgendamento: dataAgendamento.toISOString().slice(0, 19)
            })
            .getOne();
    }

    async findByIdAndMedico(
        id: number,
        medicoId: number
    ): Promise<Agendamento | undefined> {
        return await this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.medico", "medico")
            .where("medico.id = :medicoId", { medicoId })
            .andWhere("agendamento.id = :id", { id })
            .getOne();
    }

    async findByIdAndPaciente(
        id: number,
        pacienteId: number
    ): Promise<Agendamento | undefined> {
        return await this._repository
            .createQueryBuilder("agendamento")
            .leftJoinAndSelect("agendamento.paciente", "paciente")
            .where("paciente.id = :pacienteId", { pacienteId })
            .andWhere("agendamento.id = :id", { id })
            .getOne();
    }

    async create(agendamento: IAgendamento): Promise<Agendamento> {
        return await this._repository.save(agendamento);
    }

    async update(id: number, agendamento: IAgendamento): Promise<Agendamento> {
        const agendamentoExistente = await this.findById(id);

        if (!agendamentoExistente) {
            throw new Error(`Agendamento ${id} não encontrado.`);
        }

        const agendamentoAtualizado = this._repository.merge(
            agendamentoExistente,
            agendamento
        );
        const updatedAgendamento = await this._repository.save(
            agendamentoAtualizado
        );

        return updatedAgendamento;
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this._repository.delete(id);
        return deleteResult.affected !== 0;
    }
}
