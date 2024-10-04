import * as vscode from 'vscode';
import * as path from 'path';

export class MoveSimulatorViewProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = 'moveSimulatorView';

    constructor(private readonly _context: vscode.ExtensionContext) { }

    public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._context.extensionUri] // Đảm bảo webview có thể tải tài nguyên cục bộ
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    public _getHtmlForWebview(webview: vscode.Webview) {
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(this._context.extensionPath, 'webview', "build", 'assets', 'index.js'))
        );
        const styleUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(this._context.extensionPath, 'webview', "build", 'assets', 'index.css'))
        );
        return `
             <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My React App</title>
                <link href="${styleUri}" rel="stylesheet">
            </head>
            <body>
                <div id="root"></div>
                <script src="${scriptUri}"></script>
            </body>
            </html>`;
    }
}
