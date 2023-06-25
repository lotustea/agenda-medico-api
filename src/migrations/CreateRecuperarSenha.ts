import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecuperarSenhaTable1624546099909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'recuperar_senha',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'usuario_id', type: 'int', isNullable: false },
                { name: 'token', type: 'varchar', length: '8', isNullable: false },
                { name: 'criado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
            ],
            foreignKeys: [
                { columnNames: ['usuario_id'], referencedColumnNames: ['id'], referencedTableName: 'usuario' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('recuperar_senha');
    }

}
