import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { cleanOutDirectory } from '../services/fileService';
import { SolDir, outDir, moveDir, buildDir } from '../config/multerConfig';
import { deploySolidity, deployMove } from './deployController';
import { buildMove } from './buildController';

export const handleSolidity = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file && req.file.originalname.endsWith('.sol')) {
        const filePath = path.join(SolDir, req.file.originalname);
        const fileNameWithoutExtension = req.file.originalname.replace(/\.[^/.]+$/, "");

        const { privateKey, rpcUrl } = req.body;


        try {
            await deploySolidity(filePath, fileNameWithoutExtension, rpcUrl, privateKey, res);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Deployment failed: ${error.message}`);
                res.status(500).send(`Deployment failed: ${error.message}`);
            } else {
                console.error('An unknown error occurred during deployment');
                res.status(500).send('An unknown error occurred during deployment');
            }
        }
        // Delete the file after upload 
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
            } else {
                console.log(`File ${filePath} deleted successfully`);
            }
        });

        // Clean out the directory
        cleanOutDirectory(outDir);
    } else {
        res.status(400).send('No file uploaded or file is not .sol');
    }
};

export const handleMove = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file && req.file.originalname.endsWith('.move')) {
        const filePath = path.join(moveDir, req.file.originalname);
        // const fileNameWithoutExtension = req.file.originalname.replace(/\.[^/.]+$/, "");

        const { privateKey, rpcUrl, moduleName, accAddr } = req.body;

        try {
            const respBuild = await buildMove(moduleName, accAddr);
            if (respBuild.stderr.isError) {
                res.status(500).send(respBuild.stderr.message);
            }
            else {
                await deployMove(accAddr, privateKey, rpcUrl, moduleName, res);
            }


        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Deployment failed: ${error.message}`);
                if (!res.headersSent) {
                    res.status(500).send(`Deployment failed: ${error.message}`);
                }
            } else {
                console.error('An unknown error occurred during deployment');
                if (!res.headersSent) {
                    res.status(500).send('An unknown error occurred during deployment');
                }
            }
        }
        // Delete the file after upload

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err.message}`);
            } else {
                console.log(`File ${filePath} deleted successfully`);
            }
        });

        console.log(`Cleaning out build directory: ${buildDir}`);
        // Clean out the directory
        cleanOutDirectory(buildDir);
    } else {
        res.status(400).send('No file uploaded or file is not .move');
    }
};

