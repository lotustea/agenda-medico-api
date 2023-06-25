import "reflect-metadata";
import { DataSource } from "typeorm";

const srcConfig = {
  "entities": ["./src/entities/*.ts"],
  "migrations": ["./src/migrations/*.ts"]
}

const distConfig = {
  "entities": ["./dist/entities/*.js"],
  "migrations": ["./dist/migrations/*.js"]
}

export class MySQLDb {
  static dataSource = new DataSource({
    name: "agenda-medico",
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT || 3306,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: process.env.APP_AMBIENT === 'dev' ? srcConfig.entities : distConfig.entities,
    migrations: process.env.APP_AMBIENT === 'dev' ? srcConfig.migrations : distConfig.migrations,
    subscribers: [],
    migrationsRun: false
  });

  static async getConnection(): Promise<DataSource> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    return this.dataSource;
  }
}

MySQLDb.dataSource.initialize()
  .then(() => {
    console.log("Mysql DB - TypeOrm conectado com sucesso!");
  })
  .catch((err) => {
    console.error("Mysql DB - TypeOrm error", err);
  });

export default MySQLDb.dataSource;
