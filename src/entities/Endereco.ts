import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IEndereco } from './interfaces/IEndereco';

@Entity()
export class Endereco implements IEndereco{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logradouro: string;

    @Column()
    numero: string;

    @Column()
    cep: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}
