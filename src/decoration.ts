import * as vscode from 'vscode';
import * as Type from './type/type.d';
import {
    DECORATION_STYLE_KEY
} from './constant/enum';
import {
    DECORATION_INFO
} from './constant/object';
import {
    cursorOnlyDecorationWithRange,
    singelLineDecorationWithRange,
    multiLineDecorationWithRange,
    multiCursorDecorationWithRange
} from './selection';
import {
    status
} from './status';

const applyDecoration = (
    editor: vscode.TextEditor,
    decoraiton: vscode.TextEditorDecorationType,
    range: vscode.Range[]
) => editor.setDecorations(decoraiton, range);

const createEditorDecorationType = (
    styleAppliedConfig: Type.DecorationStyleConfigType | Type.StatusDecorationReadyType
) => vscode.window.createTextEditorDecorationType(styleAppliedConfig as vscode.DecorationRenderOptions);

const disposeDecoration = (
    decorationList: vscode.TextEditorDecorationType[]
) => decorationList.forEach((decorationType) => {
    decorationType.dispose();
});

const resetLastAppliedDecoration = (
    editor: vscode.TextEditor,
    decorationType: vscode.TextEditorDecorationType[]
) => decorationType.forEach(decoration => applyDecoration(editor, decoration, []));

const resetDecoration: Type.UnsetDecorationFunctionType = (
    decorationStatus: Type.DecorationStatusType,
    editor: vscode.TextEditor | undefined,
    dispose?: boolean
) => (
    decorationInfo: Type.DecorationInfoPropType
): boolean => {
    if (editor) {
        decorationStatus.status?.decorationType?.forEach((decorationType) => {
            decorationType.dispose();
        });

        decorationStatus.decorationList[decorationInfo.KEY]?.forEach(decorationType => {
            if (Array.isArray(decorationType)) {
                decorationType.forEach((decorationType: vscode.TextEditorDecorationType) => {
                    applyDecoration(editor, decorationType, []);
                });
            } else {
                applyDecoration(editor, decorationType, []);
            }
        });
        return true;
    }
    return false;
};

const resetOtherDecoration = (
    currentDecoration: Type.DecorationInfoPropType,
    reset: Type.UnsetFunctionType
): boolean =>
    Object.values(DECORATION_INFO)
        .filter(info => currentDecoration.MASK & info.MASK)
        .map(info => reset(info))
        .every(Boolean);

const resetDecorationWrapper = (
    decorationStatus: Type.DecorationStatusType,
    editor: vscode.TextEditor,
    dispose?: boolean
): boolean =>
    resetOtherDecoration(
        DECORATION_INFO.RESET,
        (decorationInfo: Type.DecorationInfoPropType): boolean =>
            resetDecoration(decorationStatus, editor, dispose)(decorationInfo));

const isDecorationChanged = (
    editor: vscode.TextEditor,
    decorationStatus: Type.DecorationStatusType,
    decorationInfo: Type.DecorationInfoPropType): boolean => {
    if (decorationStatus.appliedDecoration.applied) {
        if (decorationStatus.appliedDecoration.applied.MASK !== decorationInfo.MASK) {
            resetLastAppliedDecoration(editor, decorationStatus.decorationList[decorationStatus.appliedDecoration.applied.KEY]);
            decorationStatus.appliedDecoration.applied = decorationInfo;
            return true;
        }
        return false;
    }
    decorationStatus.appliedDecoration.applied = decorationInfo;
    return true;
};

const coordinatorSplit: Type.CoordinatorSplitType = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: (context: Type.SelectionTypeToDecorationContext) => cursorOnlyDecorationWithRange(context),
    [DECORATION_STYLE_KEY.SINGLE_LINE]: (context: Type.SelectionTypeToDecorationContext) => singelLineDecorationWithRange(context),
    [DECORATION_STYLE_KEY.MULTI_LINE]: (context: Type.SelectionTypeToDecorationContext) => multiLineDecorationWithRange(context),
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: (context: Type.SelectionTypeToDecorationContext) => multiCursorDecorationWithRange(context),
};

/**
 * decoraiton range should be depends of the border position, current setup is with default border styles.
 * 
 * @param
 * @returns
 * 
 */
const decorationCoordinator: Type.DecorationCoordinatorFunc = ({ loadConfig, editor, decorationInfo, decorationStatus }): Type.DecorationWithRangeType[] | undefined => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationStatus.decorationList[decorationInfo.KEY];
    if (textEditorDecoration) {
        const borderConfig: Type.BorderPositionParserType = loadConfig.borderPositionInfo[decorationInfo.KEY];

        if (loadConfig.generalConfigInfo.statusTextEnabled) {
            status(editor, loadConfig.status, loadConfig.generalConfigInfo, decorationInfo);
        }
        
        return coordinatorSplit[decorationInfo.KEY]({
            editor,
            borderConfig,
            textEditorDecoration
        });
    }
    return;
};

const setDecorationOnEditor: Type.SetDecorationOnEditorFunc = ({ editor, decorationInfo, loadConfig, decorationStatus }): void => {
    const textEditorDecoration: vscode.TextEditorDecorationType[] | undefined = decorationStatus.decorationList[decorationInfo.KEY];
    if (textEditorDecoration) {

        decorationStatus.appliedDecoration.editorDecoration = textEditorDecoration;

        const decorationWithRange = decorationCoordinator({ editor, decorationInfo, loadConfig, decorationStatus });

        if (!decorationWithRange) {
            return;
        }

        isDecorationChanged(editor, decorationStatus, decorationInfo);

        decorationWithRange.forEach(({ decoration, range }) => {
            applyDecoration(editor, decoration, range);
        });
    }
};

export {
    applyDecoration,
    disposeDecoration,
    createEditorDecorationType,
    setDecorationOnEditor,
    resetDecorationWrapper,
    isDecorationChanged
};