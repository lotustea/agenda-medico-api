import { BaseRepository } from "./BaseRepository";
import { AgendaMedico } from "../entities/AgendaMedico";
import { IAgendaMedicoRepository } from "./interfaces/IAgendaMedicoRepository";
import { IAgendaMedico } from "../entities/interfaces/IAgendaMedico";

export class AgendaMedicoRepository
    extends BaseRepository<AgendaMedico>
    implements IAgendaMedicoRepository {
    constructor() {
        super(AgendaMedico);
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<AgendaMedico[]> {
        const query = this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .leftJoinAndSelect("agendaMedico.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .take(limit)
            .skip((page - 1) * limit);

        if (dataAgendamentoMin) {
            query.andWhere("agendaMedico.dataAgendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin,
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendaMedico.dataAgendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax,
            });
        }

        const agendaMedicos = await query.getMany();

        return agendaMedicos;
    }

    async findAllByMedico(
        medicoId: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<AgendaMedico[]> {
        const query = this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.medico", "medico")
            .leftJoinAndSelect("agendaMedico.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .where("medico.id = :medicoId", { medicoId });

        if (dataAgendamentoMin) {
            query.andWhere("agendaMedico.dataAgendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin,
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendaMedico.dataAgendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax,
            });
        }

        const agendaMedicos = await query.getMany();

        return agendaMedicos;
    }

    async findAllByPaciente(
        pacienteId: number,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<AgendaMedico[]> {
        const query = this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.paciente", "paciente")
            .leftJoinAndSelect("agendaMedico.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .where("paciente.id = :pacienteId", { pacienteId });

        if (dataAgendamentoMin) {
            query.andWhere("agendaMedico.dataAgendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin,
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendaMedico.dataAgendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax,
            });
        }

        const agendaMedicos = await query.getMany();

        return agendaMedicos;
    }

    async count(
        page: number = 1,
        limit: number = 10,
        dataAgendamentoMin: Date,
        dataAgendamentoMax: Date
    ): Promise<number> {
        const query = this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .leftJoinAndSelect("agendaMedico.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .take(limit)
            .skip((page - 1) * limit);

        if (dataAgendamentoMin) {
            query.andWhere("agendaMedico.dataAgendamento >= :dataAgendamentoMin", {
                dataAgendamentoMin,
            });
        }

        if (dataAgendamentoMax) {
            query.andWhere("agendaMedico.dataAgendamento <= :dataAgendamentoMax", {
                dataAgendamentoMax,
            });
        }

        return query.getCount();
    }

    async findById(id: number): Promise<AgendaMedico | undefined> {
        return await this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.medico", "medico")
            .leftJoinAndSelect("medico.usuario", "medicoUsuario")
            .leftJoinAndSelect("medicoUsuario.pessoaFisica", "medicoPessoaFisica")
            .leftJoinAndSelect("medicoPessoaFisica.endereco", "medicoEndereco")
            .leftJoinAndSelect("agendaMedico.paciente", "paciente")
            .leftJoinAndSelect("paciente.usuario", "pacienteUsuario")
            .leftJoinAndSelect("pacienteUsuario.pessoaFisica", "pacientePessoaFisica")
            .leftJoinAndSelect("pacientePessoaFisica.endereco", "pacienteEndereco")
            .where("agendaMedico.id = :id", { id })
            .getOne();
    }

    async findByMedicoAndData(
        medicoId: number,
        dataAgendamento: Date
    ): Promise<AgendaMedico | undefined> {
        return await this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.medico", "medico")
            .where("medico.id = :medicoId", { medicoId })
            .andWhere("agendaMedico.dataAgendamento = :dataAgendamento", {
                dataAgendamento,
            })
            .getOne();
    }

    async findByIdAndMedico(
        id: number,
        medicoId: number
    ): Promise<AgendaMedico | undefined> {
        return await this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.medico", "medico")
            .where("medico.id = :medicoId", { medicoId })
            .andWhere("agendaMedico.id = :id", { id })
            .getOne();
    }

    async findByIdAndPaciente(
        id: number,
        pacienteId: number
    ): Promise<AgendaMedico | undefined> {
        return await this._repository
            .createQueryBuilder("agendaMedico")
            .leftJoinAndSelect("agendaMedico.paciente", "paciente")
            .where("paciente.id = :pacienteId", { pacienteId })
            .andWhere("agendaMedico.id = :id", { id })
            .getOne();
    }

    async create(agendaMedico: IAgendaMedico): Promise<AgendaMedico> {
        return await this._repository.save(agendaMedico);
    }

    async update(id: number, agendaMedico: IAgendaMedico): Promise<AgendaMedico> {
        const agendaMedicoExistente = await this.findById(id);

        if (!agendaMedicoExistente) {
            throw new Error(`AgendaMedico ${id} não encontrado.`);
        }

        const agendaMedicoAtualizado = this._repository.merge(
            agendaMedicoExistente,
            agendaMedico
        );
        const updatedAgendaMedico = await this._repository.save(
            agendaMedicoAtualizado
        );

        return updatedAgendaMedico;
    }

    async delete(id: number): Promise<boolean> {
        const deleteResult = await this._repository.delete(id);
        return deleteResult.affected !== 0;
    }
}
