import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from './Usuario';
import { IPaciente } from './interfaces/IPaciente';

@Entity()
export class Paciente implements IPaciente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    enfermidade: string;

    @OneToOne(type => Usuario)
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}
