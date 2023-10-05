"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRouter = void 0;
const express_1 = require("express");
const stream_to_array_1 = __importDefault(require("stream-to-array"));
// @ts-ignore
const image_to_pdf_1 = __importDefault(require("image-to-pdf"));
exports.UploadRouter = (0, express_1.Router)();
exports.UploadRouter.post("/", (req, res) => {
    try {
        const files = req.body;
        const stream = (0, image_to_pdf_1.default)(files.map(file => Buffer.from(file.data)), image_to_pdf_1.default.sizes.A4);
        (0, stream_to_array_1.default)(stream, (error, array) => {
            if (error) {
                return res.status(500).send(String(error));
            }
            const buffer = Buffer.concat(array);
            res.contentType('application/pdf').send(buffer);
        });
    }
    catch (error) {
        res.status(500).send(String(error));
    }
});
