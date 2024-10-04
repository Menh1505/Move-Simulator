import multer from 'multer';
import { Request } from 'express';
import path from 'path';


const SolStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for uploaded files
        cb(null, 'uploads'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        // Set the filename for the uploaded file
        // Here, we are keeping the original file name
        cb(null, file.originalname);
    }
});
const MoveStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for uploaded files
        cb(null, 'sources'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        // Set the filename for the uploaded file
        // Here, we are keeping the original file name
        cb(null, file.originalname);
    }
});

const SolFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Get the file extension of the uploaded file
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Check if the file extension is .sol
    if (fileExtension === '.sol') {
        cb(null, true); // Accept file if it's a .sol file
    } else {
        cb(new Error('File uploaded must be .sol')); // Throw error if file type is not .sol
    }
};

const MoveFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Get the file extension of the uploaded file
    const fileExtension = path.extname(file.originalname).toLowerCase();

    // Check if the file extension is .sol
    if (fileExtension === '.move') {
        cb(null, true); // Accept file if it's a .sol file
    } else {
        cb(new Error('File uploaded must be .move')); // Throw error if file type is not .sol
    }
};

const uploadSol = multer({
    storage: SolStorage,
    fileFilter: SolFileFilter // Use fileFilter to filter file types
});

const uploadMove = multer({
    storage: MoveStorage,
    fileFilter: MoveFileFilter // Use fileFilter to filter file types
});

// Create uploads directory if not exists
const SolDir = 'uploads';
const outDir = 'out';
const moveDir = 'sources';
const buildDir = 'build';

export { uploadSol, uploadMove, SolDir, outDir, moveDir, buildDir };