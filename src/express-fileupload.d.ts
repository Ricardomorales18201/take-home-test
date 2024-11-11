import { UploadedFile } from 'express-fileupload';

declare global {
    namespace Express {
        interface Request {
            files?: fileUpload.FileArray;
        }
    }
}

export {}; 
