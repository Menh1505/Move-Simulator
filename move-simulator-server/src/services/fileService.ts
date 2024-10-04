import fs from 'fs';
import path from 'path';

// Async function to clean the /out directory
const cleanOutDirectory = async (dir: string) => {
    try {
        // Read the directory
        const files = await fs.promises.readdir(dir);

        // Delete each file or directory
        for (const file of files) {
            const filePath = path.join(dir, file);
            try {
                // Delete file or directory (recursive: true will delete directories recursively)
                await fs.promises.rm(filePath, { recursive: true, force: true });
                console.log(`Deleted: ${filePath}`);
            } catch (err) {
                //check if err is an instance of Error
                if (err instanceof Error) {
                    console.error(`Error deleting ${filePath}: ${err.message}`);
                } else {
                    console.error(`Unknown error deleting ${filePath}`);
                }
            }
        }
    } catch (err) {
        //check if err is an instance of Error
        if (err instanceof Error) {
            console.error(`Error reading '${dir}' directory: ${err.message}`);
        } else {
            console.error(`Unknown error reading '${dir}' directory`);
        }
    }
};

export { cleanOutDirectory};
