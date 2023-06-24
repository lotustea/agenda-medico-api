
import { MySQLDb } from "databases/MysqlDb";
import { EntityTarget, Repository, ObjectLiteral } from "typeorm";

export abstract class BaseRepository<T extends ObjectLiteral>{
    protected _repository: Repository<T>;
    constructor(entity: EntityTarget<T>) {
        this._repository = MySQLDb.dataSource.getRepository(entity);
    }
    
}