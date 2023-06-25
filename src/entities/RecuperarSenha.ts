import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IRecuperarSenha } from './interfaces/IRecuperarSenha';

@Entity()
export class RecuperarSenha implements IRecuperarSenha {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario_id: number;

    @Column()
    token: string;

    @CreateDateColumn()
    criado_em: Date;
}
