import * as vscode from 'vscode';
import * as Type from './type/type.d';
import * as config from './config';
import {
    applyDecoration,
    setDecorationOnEditor,
    resetDecorationWrapper,
    isDecorationChanged
} from './decoration';
import {
    DECORATION_INFO
} from './constant/object';
import {
    fixConfiguration
} from './util/util';
import {
    editorIndentOption,
    getSelectionType
} from './editor';

const onActiveWindowChange = (configReady: Type.ConfigInfoReadyType, statusInfo: Type.StatusInfoType, decorationState: Type.DecorationStateType): vscode.Disposable => {
    return vscode.window.onDidChangeWindowState((event: vscode.WindowState) => {
        if (event.focused) {
            // apply decoration to active editor.
            if (vscode.window.activeTextEditor) {
                setDecorationOnEditor({
                    editor: vscode.window.activeTextEditor,
                    configInfo: configReady,
                    statusInfo: statusInfo,
                    decorationState: decorationState,
                    decorationInfo: DECORATION_INFO.CURSOR_ONLY
                });
            }
        } else {
            // reset all decoration on all editors.
            vscode.window.visibleTextEditors.forEach((editor: vscode.TextEditor) => {
                resetDecorationWrapper(decorationState, editor, true);
            });
        }
    });
};

const activeEditorChanged = (configReady: Type.ConfigInfoReadyType, statusInfo: Type.StatusInfoType, decorationState: Type.DecorationStateType): vscode.Disposable => {
    return vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
        if (editor) {

            if (configReady.configError.length > 0) {
                fixConfiguration(configReady.configError);
            }

            editorIndentOption(statusInfo, editor);

            // quick release of decorations.
            // this method feels smoother than tracking the last active editor in object literal, 
            // and resetting the decoration. 

            vscode.window.visibleTextEditors.forEach(editor => {
                if (decorationState.appliedDecoration.editorDecoration !== undefined) {
                    decorationState.appliedDecoration.editorDecoration.forEach(decoration => {
                        applyDecoration(editor, decoration, []);
                    });
                }
            });

            setDecorationOnEditor({
                editor: editor,
                configInfo: configReady,
                statusInfo: statusInfo,
                decorationState: decorationState,
                decorationInfo: DECORATION_INFO.CURSOR_ONLY
            });
        }
    });
};

const editorOptionChange = (statusInfo: Type.StatusInfoType,): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorOptions((event: vscode.TextEditorOptionsChangeEvent) => {
        editorIndentOption(statusInfo, event.textEditor);
    });
};

const selectionChanged = (configReady: Type.ConfigInfoReadyType, statusInfo: Type.StatusInfoType, decorationState: Type.DecorationStateType): vscode.Disposable => {
    return vscode.window.onDidChangeTextEditorSelection((event: vscode.TextEditorSelectionChangeEvent) => {
        if (event.selections) {
            const decorationInfo: Type.DecorationInfoPropType | undefined = getSelectionType(event.textEditor);
            if (!decorationInfo) {
                return;
            }

            isDecorationChanged(event.textEditor, decorationState, decorationInfo);

            if (!decorationState.decorationList[decorationInfo.KEY]) {
                return;
            }

            setDecorationOnEditor({
                editor: event.textEditor,
                configInfo: configReady,
                statusInfo: statusInfo,
                decorationState: decorationState,
                decorationInfo: decorationInfo
            });
        }
    });
};

const configChanged = (context: vscode.ExtensionContext, configReady: Type.ConfigInfoReadyType, statusInfo: Type.StatusInfoType, decorationState: Type.DecorationStateType): vscode.Disposable => {
    return vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
        if (event) {
            const loadConfig = config.initialiseConfig(context);
            if (loadConfig) {
                configReady = loadConfig.config;
                statusInfo = loadConfig.status;
                console.log(configReady);
                console.log(statusInfo);
                console.log(decorationState);
                // if (configReady.configError.length) {
                //     sendAutoDismissMessage('All Configuration Ok.', 2000);   
                // }
            }
        }
    });
};

export {
    onActiveWindowChange,
    activeEditorChanged,
    editorOptionChange,
    selectionChanged,
    configChanged,
};
