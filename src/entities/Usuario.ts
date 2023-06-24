import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PessoaFisica } from './PessoaFisica';
import { IUsuario } from './interfaces/IUsuario';

@Entity()
export class Usuario implements IUsuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario: string;

    @Column()
    senha: string;

    @Column()
    perfil: 'medico' | 'secretaria' | 'paciente';

    @ManyToOne(type => PessoaFisica)
    @JoinColumn({ name: "pessoa_fisica_id" })
    pessoaFisica: PessoaFisica;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}
