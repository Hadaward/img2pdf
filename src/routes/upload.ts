import { Router, Response, Request } from 'express';
import stream2Array from 'stream-to-array';

// @ts-ignore
import image2PDF from 'image-to-pdf';

export const UploadRouter: Router = Router();

UploadRouter.post("/", (req: Request, res: Response): void => {
    try {
        const files: Array<{name: string, data: number[]}> = req.body;

        const stream = image2PDF(
            files.map(file => Buffer.from(file.data)),
            image2PDF.sizes.A4
        )

        stream2Array(stream, (error, array) => {
            if (error) {
                return res.status(500).send(String(error));
            }

            const buffer = Buffer.concat(array);
            res.contentType('application/pdf').send(buffer);
        });
    } catch (error) {
        res.status(500).send(String(error));
    }
})