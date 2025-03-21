"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multer = Multer;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
function Multer(type = "Memory", fileprefix, folderName) {
    const defaultDir = path_1.default.join(__dirname, '../../public/uploads');
    const storage = type === "Memory"
        ? multer_1.default.memoryStorage()
        : multer_1.default.diskStorage({
            destination: folderName ? path_1.default.join(defaultDir, folderName) : defaultDir,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, fileprefix ? fileprefix + '-' + uniqueSuffix + path_1.default.extname(file.originalname) : uniqueSuffix + path_1.default.extname(file.originalname));
            }
        });
    return (0, multer_1.default)({ storage });
}
