import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePacienteTable1624546098804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'paciente',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'enfermidade', type: 'varchar', length: '50', isNullable: false },
                { name: 'usuario_id', type: 'int', isNullable: false },
                { name: 'criado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
                { name: 'atualizado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', isNullable: false },
            ],
            foreignKeys: [
                { columnNames: ['usuario_id'], referencedColumnNames: ['id'], referencedTableName: 'usuario' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('paciente');
    }

}
