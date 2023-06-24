import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePessoaFisicaTable1624546098802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'pessoa_fisica',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'nome', type: 'varchar', length: '50', isNullable: false },
                { name: 'sobrenome', type: 'varchar', length: '50', isNullable: false },
                { name: 'data_nascimento', type: 'date', isNullable: false },
                { name: 'cpf', type: 'varchar', length: '20', isNullable: false },
                { name: 'email', type: 'varchar', length: '50', isNullable: false },
                { name: 'endereco_id', type: 'int', isNullable: false },
                { name: 'criado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
                { name: 'atualizado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', isNullable: false },
            ],
            foreignKeys: [
                { columnNames: ['endereco_id'], referencedColumnNames: ['id'], referencedTableName: 'endereco' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pessoa_fisica');
    }

}
