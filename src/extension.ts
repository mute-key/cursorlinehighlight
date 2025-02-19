/**
 * [extension activate function]
 * 
 */
import * as vscode from 'vscode';
import { cursorActivate } from './cursor';

export function activate(context: vscode.ExtensionContext) {
    cursorActivate(context).then((event) => {
        if (event) {
            context.subscriptions.push(...event);
        }
    });
}

export function deactivate() {}