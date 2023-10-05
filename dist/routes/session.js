"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRouter = void 0;
const express_1 = require("express");
exports.UploadRouter = (0, express_1.Router)();
exports.UploadRouter.post("/", (req, res) => {
    console.log(req.body);
});
