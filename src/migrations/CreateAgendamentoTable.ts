import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAgendamentoTable1624546098806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'agendamento',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'data_agendamento', type: 'date', isNullable: false },
                { name: 'medico_id', type: 'int', isNullable: false },
                { name: 'paciente_id', type: 'int', isNullable: false },
                { name: 'criado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', isNullable: false },
                { name: 'atualizado_em', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', isNullable: false },
            ],
            foreignKeys: [
                { columnNames: ['medico_id'], referencedColumnNames: ['id'], referencedTableName: 'medico' },
                { columnNames: ['paciente_id'], referencedColumnNames: ['id'], referencedTableName: 'usuario' },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('agendamento');
    }

}
