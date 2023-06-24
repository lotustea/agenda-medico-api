import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsuarioTable1624546098803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'usuario',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'usuario', type: 'varchar', length: '50', isNullable: false },
                { name: 'senha', type: 'varchar', length: '255', isNullable: false },
                { name: 'perfil', type: 'varchar', length: '50', isNullable: false },                
                { name: 'pessoa_fisica_id', type: 'int', isNullable: false },
                { name: 'criado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
                { name: 'atualizado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', isNullable: false },
            ],
            foreignKeys: [
                { columnNames: ['pessoa_fisica_id'], referencedColumnNames: ['id'], referencedTableName: 'pessoa_fisica' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}
