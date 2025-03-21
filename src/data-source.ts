import { DataSource } from "typeorm";
import { SUPABASE_URL } from "./config";
import path from "path";

export const purwadhikaDB = new DataSource({
    type: "postgres",
    url: SUPABASE_URL || "",
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname,"/entities/*.{ts,js}")],
    migrations: [path.join(__dirname,"/migrations/*.{ts,js}")]
});