import express, { Request, Response, NextFunction } from 'express';
import { getAuthUrl, setAuthToken, drive } from '../services/authService';
import fileUpload, { UploadedFile } from 'express-fileupload';

const app = express();
app.use(fileUpload());

// Route to initiate authentication
app.get('/auth', (req: Request, res: Response) => {
    const url = getAuthUrl();
    res.redirect(url);
});

// Helper function to handle async errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// OAuth callback
app.get('/auth/callback', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code = req.query.code as string;
        await setAuthToken(code);
        res.send('Authentication successful! You can now use the application.');
    } catch (error) {
        next(error);
    }
});

// List files
app.get('/files', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await drive.files.list({
            pageSize: 10,
            fields: 'files(id, name, mimeType, modifiedTime)',
        });
        res.json(response.data.files);
    } catch (error) {
        next(error);
    }
});

// Define POST /upload route on fileRoutes
// Upload file
app.post('/upload', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const file = req.files?.file as UploadedFile | UploadedFile[] | undefined;
    if (!file) return res.status(400).send('No file uploaded');

    const uploadedFile = Array.isArray(file) ? file[0] : file;

    const response = await drive.files.create({
        requestBody: { name: uploadedFile.name },
        media: { mimeType: uploadedFile.mimetype, body: uploadedFile.data },
    });

    res.send(`File uploaded with ID: ${response.data.id}`);
}));


// Download file
app.get('/download/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileId = req.params.id;
        const response = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' }
        );
        response.data.pipe(res);
    } catch (error) {
        next(error);
    }
});

// Delete file
app.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileId = req.params.id;
        await drive.files.delete({ fileId });
        res.send(`File with ID: ${fileId} deleted`);
    } catch (error) {
        next(error);
    }
});

export default app;