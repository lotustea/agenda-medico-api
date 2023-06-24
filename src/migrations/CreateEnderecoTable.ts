import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnderecoTable1624546098801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'endereco',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'logradouro', type: 'varchar', length: '50', isNullable: false },
                { name: 'numero', type: 'varchar', length: '10', isNullable: false },
                { name: 'cep', type: 'varchar', length: '10', isNullable: false },
                { name: 'cidade', type: 'varchar', length: '50', isNullable: false },
                { name: 'estado', type: 'varchar', length: '50', isNullable: false },
                { name: 'criado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
                { name: 'atualizado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', isNullable: false },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('endereco');
    }

}
