import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Endereco } from './Endereco';
import { IPessoaFisica } from './interfaces/IPessoaFisica';

@Entity()
export class PessoaFisica implements IPessoaFisica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column()
    data_nascimento: Date;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @ManyToOne(type => Endereco)
    @JoinColumn({ name: "endereco_id" })
    endereco: Endereco;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}
