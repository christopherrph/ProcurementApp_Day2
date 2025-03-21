"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const config_1 = require("./config");
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
// import router
const item_router_1 = __importDefault(require("./routers/item.router"));
const purchaserequest_router_1 = __importDefault(require("./routers/purchaserequest.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const PORT = config_1.PORT || 3000;
const app = (0, express_1.default)();
// use middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("combined", {
    stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log")),
}));
// error handling
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.use("/items", item_router_1.default);
app.use("/purchase-requests", purchaserequest_router_1.default);
app.use("/users", user_router_1.default);
// start server and connect to database
data_source_1.purwadhikaDB.initialize()
    .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error(err);
});
