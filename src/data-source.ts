import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Asset } from "./entities/Asset"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: 'esalas',
    password: '0ewj0Ra6zYWe',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [User, Asset],
    migrations: [],
    subscribers: [],
})
