import * as vscode from 'vscode';
import { MoveSimulatorViewProvider } from './MoveSimulatorViewProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "move-simulator-vscode" is now active!');

	const provider = new MoveSimulatorViewProvider(context);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(MoveSimulatorViewProvider.viewType, provider)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('move-simulator-vscode.openWebview', () => {
			// Tạo một WebviewPanel
			const panel = vscode.window.createWebviewPanel(
				'webview',
				'Sample Webview',
				vscode.ViewColumn.One,
				{
					enableScripts: true, // Cho phép script nếu cần
				}
			);

			// Thiết lập nội dung HTML cho webview
			panel.webview.html = provider._getHtmlForWebview(panel.webview);
		})
	);
}

export function deactivate() { }