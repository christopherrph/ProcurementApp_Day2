"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purwadhikaDB = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
exports.purwadhikaDB = new typeorm_1.DataSource({
    type: "postgres",
    url: config_1.SUPABASE_URL || "",
    synchronize: false,
    logging: false,
    entities: [path_1.default.join(__dirname, "/entities/*.ts")],
    migrations: [path_1.default.join(__dirname, "/migrations/*.ts")]
});
