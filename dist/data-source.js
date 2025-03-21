"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purwadhikaDB = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
exports.purwadhikaDB = new typeorm_1.DataSource({
    type: "postgres",
    url: config_1.SUPABASE_URL || "",
    synchronize: false,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
});
