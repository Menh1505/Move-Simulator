import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const buildMove = async (moduleName: string, accAddr: string): Promise<{ stdout: string, stderr: { message: string, isError: boolean } }> => {
    const moveCommand = `aptos move compile --named-addresses ${moduleName}="${accAddr}"`;
    try {
        const resp = await execPromise(moveCommand);
        const finalResp = {
            stderr: {
                message: resp.stderr,
                isError: false,
            },
            stdout: resp.stdout,
        };
        console.log("build function" + resp.stdout);
        return finalResp;
    } catch (error: any) {
        const finalResp = {
            stderr: {
                message: error.message,
                isError: true,
            },
            stdout: "",
        };
        return finalResp;
    }
};
