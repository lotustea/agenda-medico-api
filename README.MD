docker compose up -d --build
dentro do container npx typeorm-ts-node-commonjs migration:run -d src/databases/MysqlDb.ts