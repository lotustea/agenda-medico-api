import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";
import { IAgendamento } from "./interfaces/IAgendamento";

@Entity()
export class Agendamento implements IAgendamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data_agendamento: Date;

    @Column()
    medico_id: number;

    @Column()
    paciente_id: number;

    @ManyToOne((type) => Medico)
    @JoinColumn({ name: "medico_id" })
    medico: Medico;

    @ManyToOne((type) => Paciente)
    @JoinColumn({ name: "paciente_id" })
    paciente: Paciente;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}
