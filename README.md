# Move Simulator Project

This project consists of two sub-projects: `move-simulator-vscode` and `move-simulator-server`. Below are the instructions on how to use the scripts defined in the root `package.json` to manage these sub-projects.

## Scripts

### Start Scripts

- **`npm run start:vscode`**: This command navigates to the `move-simulator-vscode` directory and starts the application.
- **`npm run start:server`**: This command navigates to the `move-simulator-server` directory and starts the server.
- **`npm run start:all`**: This command starts both the `move-simulator-vscode` and `move-simulator-server` applications concurrently.

### Build Scripts

- **`npm run build:vscode`**: This command navigates to the `move-simulator-vscode` directory and builds the application.
- **`npm run build:server`**: This command navigates to the `move-simulator-server` directory and builds the server.
- **`npm run build:all`**: This command builds both the `move-simulator-vscode` and `move-simulator-server` applications sequentially.

### Test Scripts

- **`npm run test:vscode`**: This command navigates to the `move-simulator-vscode` directory and runs the tests.
- **`npm run test:server`**: This command navigates to the `move-simulator-server` directory and runs the tests.
- **`npm run test:all`**: This command runs tests for both the `move-simulator-vscode` and `move-simulator-server` applications sequentially.

### To debug the vscode extension
- After cloning the repository, open the move-simulator-vscode folder in a new VS Code tab.
- Run the command to install packages.
```shell
npm run install:all
```
- Run the command to build the webview.
```shell
npm run webview:build
```
- Press F5 to debug the extension.

## Additional Information

- Ensure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
- Before running any scripts, make sure to install the necessary dependencies by running `npm install` in the root directory and in each sub-project directory.

For more detailed information about each sub-project, refer to their respective README files.

