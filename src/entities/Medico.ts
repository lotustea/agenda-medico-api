import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from './Usuario';
import { IMedico } from './interfaces/IMedico';

@Entity()
export class Medico implements IMedico{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    especialidade: string;

    @OneToOne(type => Usuario)
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}
