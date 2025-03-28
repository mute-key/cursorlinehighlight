import * as vscode from 'vscode';
import * as DecorationType from './decoration.d';
import { DECORATION_STYLE_KEY, SELECTION_CONTENT_TEXT_CONFIG_KEY } from 'src/constant/enum';

type SelectionDecorationStyleType = {
    leftMargin?: string
    placeholderDecorationOption?: DecorationType.DecorationRenderOptionType,
    selectionDecorationOption: {
        ln?: DecorationType.DecorationRenderOptionType,
        col?: DecorationType.DecorationRenderOptionType,
        zCol?: DecorationType.DecorationRenderOptionType,
        char?: DecorationType.DecorationRenderOptionType,
        lc?: DecorationType.DecorationRenderOptionType,
        nth?: DecorationType.DecorationRenderOptionType,
        count?: DecorationType.DecorationRenderOptionType
    }
}

type StatusContentTextPositionType = {
    contentText?: (string | symbol | ContentTextFuncSignature)[],
    position: {
        [key: number]: string
    }
}

type StatusContentTextPositionReadyType = {
    contentText: any[],
} & StatusContentTextPositionType

type StatusContentTextType = {
    [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: {
        contentText: any[]
        position: number[]
    } | ContentTextSymlinkKind
}

type ContentTextSymlinkKind = {
    contentText: any[],
    position: symbol[]
}

type ContentTextPositionFunc = {
    contentText: any[],
    position: {
        [key: number]: (context: any) => string
    }
}

type SelectionTextInfoSplitType = {
    [k in keyof typeof DECORATION_STYLE_KEY]: () => StatusTextInfoType[]
};

type CursorOnlyStatusTextRegExp = {
    col: RegExp
    zCol: RegExp
    ln: RegExp
}

type SingleLineStatusTextRegExp = {
    char: RegExp
    ln: RegExp
}

type MultiLineCursorStatusTextRegExp = {
    lc: RegExp
    ln: RegExp
    char: RegExp
}

type MultiLineAnchorStatusTextRegExp = {
    lc: RegExp
    ln: RegExp
    char: RegExp
}

type MultiCursorStatusTextRegExp = {
    nth: RegExp
    count: RegExp
    lc: RegExp
    ln: RegExp
    char: RegExp
}

type RegexStatusContentTextUnion = CursorOnlyStatusTextRegExp | SingleLineStatusTextRegExp | MultiLineCursorStatusTextRegExp | MultiLineAnchorStatusTextRegExp | MultiCursorStatusTextRegExp

type RegexStatusContentTextType = {
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.CURSOR_ONLY_TEXT]: CursorOnlyStatusTextRegExp
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.SINGLE_LINE_TEXT]: SingleLineStatusTextRegExp
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_CURSOR_TEXT]: MultiLineCursorStatusTextRegExp
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_LINE_ANCHOR_TEXT]: MultiLineAnchorStatusTextRegExp
    [SELECTION_CONTENT_TEXT_CONFIG_KEY.MULTI_CURSOR_TEXT]: MultiCursorStatusTextRegExp
}

type SelectionDecorationConfigType = {
    color?: string,
    colorOpacity?: number,
    backgroundColor?: string,
    backgroundOpacity?: number,
    fontStyle?: string,
    fontWeight?: string,
    cursorOnlyText?: string,
    singleLineText?: string,
    leftMargin?: string,
    multiLineCursorText?: string,
    multiLineAnchorText?: string,
    multiCursorText?: string,
    selectionCountTextStyle: {
        ln?: string,
        col?: string,
        zCol?: string,
        char?: string,
        lc?: string,
        nth?: string,
        count?: string,
        opacity?: number,
        fontStyle?: string,
        fontWeight?: string,
    }
}

type StatusTextInfo = {
    opacity?: number,
    color?: string,
    backgroundColor?: string,
    fontStyle?: string,
    fontWeight?: string
    cursorOnlyText?: string,
    singleLineText?: string,
    multiLineCursorText?: string,
    multiLineAnchorText?: string,
    multiCursorText?: string,
}

type ConfigInfoType = {
    name?: string
}

type IndentInfoType = {
    size?: number,
    type?: string,
    regex?: RegExp,
}

type IndentReadyType = {
    size: number,
    type: string,
    regex: RegExp,
}

type StatusInfoType = {
    indent: IndentInfoType
    statusDecoration?: DecorationType.DecorationRenderOptionType
}

type StatusTextInfoType = {
    contentText: DecorationType.DecorationRenderOptionType[]
    range: vscode.Range
}


type ContentTextFuncContext = {
    idx: number,
    editor: vscode.TextEditor,
    indent: IndentReadyType,
}

type ContentTextFuncSignature = (context: ContentTextFuncContext) => any

// type ContentTextWithIndexFuncContext = {
//     idx: number,
//     editor: vscode.TextEditor,
//     indent: IndentType,
// }

// type ContentTextWithIndexFuncSignature = (context: ContentTextWithIndexFuncContext) => string | number

type ContentTextFunc = Record<string, (symbol | string | ContentTextFuncSignature)>;

type ContentTextStateFuncSignature = (statusContentText: StatusContentTextType) => void

type StatusOfType = {
    [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
}

type ContentTextStateType = {
    [k in SELECTION_CONTENT_TEXT_CONFIG_KEY]: ContentTextFunc;
}

type SplitFuncType = {
    position: number,
    array: (string | symbol | ContentTextFuncSignature)[]
}

type SearchObjectType = {
    nextSearchString: string | symbol | (ContentTextFuncSignature),
    lastPosition: number
}

type BindContentTextStateType = {
    functionOf: ContentTextStateType,
    textOf: StatusContentTextType,
    infoOf: IndentInfoType
    // styleOf: StatusDecorationStyleType
    // contentTextState: ContentTextStateFuncSignature
}
