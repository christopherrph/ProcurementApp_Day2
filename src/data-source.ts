import { DataSource } from "typeorm";
import { SUPABASE_URL } from "./config";

export const purwadhikaDB = new DataSource({
    type: "postgres",
    url: SUPABASE_URL || "",
    synchronize: false,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
});