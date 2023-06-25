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
import { IAgendaMedico } from "./interfaces/IAgendaMedico";

@Entity()
export class AgendaMedico implements IAgendaMedico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data_agendamento: Date;

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
