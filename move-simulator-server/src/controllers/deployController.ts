import { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import { spawn } from 'child_process';

export const deploySolidity = async (filePath: string, fileNameWithoutExtension: string, rpcUrl: string, privateKey: string, res: Response) => {
    const forgeCommand = `forge create ${filePath}:${fileNameWithoutExtension} --rpc-url ${rpcUrl} --private-key ${privateKey}`;

    return new Promise<void>((resolve, reject) => {
        exec(forgeCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                res.status(500).send(`Error executing command: ${error.message}`);
                reject(error);
                return;
            }

            if (stderr) {
                console.error(`Error output: ${stderr}`);
                res.status(500).send(`Command failed: ${stderr}`);
                reject(new Error(stderr));
                return;
            }

            res.send(`Command output: ${stdout}`);
            resolve();
        });
    });
};


export const deployMove = async (accAddr: string, privateKey: string, rpcUrl: string, moduleName: string, res: Response): Promise<void> => {
    const moveCommand = `aptos move publish --sender-account ${accAddr} --url ${rpcUrl} --private-key ${privateKey} --named-addresses ${moduleName}=${accAddr}`;
    const moveArgs = moveCommand.split(' ');

    console.log(`Deploying Move module: ${moduleName}`);

    return new Promise((resolve, reject) => {
        const child = spawn(moveArgs[0], moveArgs.slice(1));

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        child.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error executing command: ${stderr}`);
                const finalResp = {
                    stderr: {
                        message: stderr,
                        isError: true,
                    },
                    stdout: stdout,
                };
                res.status(500).send(finalResp);
                reject(new Error(stderr));
                return;
            }

            const finalResp = {
                stderr: {
                    message: stderr,
                    isError: !!stderr,
                },
                stdout: stdout,
            };

            console.log("deploy function stdout: " + stdout);
            console.log("deploy function stderr: " + stderr);
            res.send(finalResp);
            resolve();
        });
    });
};


