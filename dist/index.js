"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const upload_1 = require("./routes/upload");
const app = (0, express_1.default)();
// Setup middle-wares
app.use((0, cors_1.default)(config_1.config.cors));
app.use(express_1.default.json(config_1.config.json));
app.use(express_1.default.urlencoded(config_1.config.urlencoded));
// Setup routes
app.all("*", (_, __, next) => next());
app.use("/upload", upload_1.UploadRouter);
app.use("/", (_, res) => {
    res.send("Ping Pong!");
});
app.listen(config_1.config.port, () => console.log(`App running on port ${config_1.config.port}`));
