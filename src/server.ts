// src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import fileUpload from 'express-fileupload';
import fileRoutes from './routes/fileRoutes';
import { errorHandler } from './middlleware/errorHandler';

const app = express();
const PORT = 3000;

app.use(fileUpload()); // Middleware for file uploads
app.use('/api', fileRoutes); // Define routes for Google Drive file operations
app.use(errorHandler); // Global error handler

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
