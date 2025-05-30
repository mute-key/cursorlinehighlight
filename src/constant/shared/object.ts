import * as __0x from './numeric';

// ==============================================================================
// [ RUNTIME READONLY CONSTANT/ENUM ]
// ==============================================================================

export const INDENT_INFO = {
    size: undefined,
    type: undefined,
    regex: undefined
};

export const DECORATION_STATE = {
    appliedHighlight: [0],
    diagnosticSignature: [0],
    eventTrigger: [0],
    previousLine: [0],
};

export const SELECTION_KIND_LIST = [
    __0x.cursorOnly,
    __0x.singleLine,
    __0x.multiLine,
    __0x.multiCursor,
];

export const HIGHLIGHT_STYLE_LIST = {
    [__0x.reset]: [],
    [__0x.cursorOnly]: [],
    [__0x.singleLine]: [],
    [__0x.multiLine]: [],
    [__0x.multiCursor]: []
} as const;

export const HIGHLIGHT_BORDER_POSITION_INFO = {
    [__0x.cursorOnly]: undefined,
    [__0x.singleLine]: undefined,
    [__0x.multiLine]: undefined,
    [__0x.multiCursor]: undefined
} as const;

export const DIAGNOSTIC_STATE = {
    override: 0,
    severity: 0,
    editor: {
        warning: {
            line: [],
            total: 0
        },
        error: {
            line: [],
            total: 0
        }
    },
    workspace: {
        warning: {
            source: 0,
            total: 0
        },
        error: {
            source: 0,
            total: 0
        }
    }
} as const;

export const SELECTION_CONTENT_TEXT = {
    [__0x.cursorOnlyText]: undefined,
    [__0x.singleLineText]: undefined,
    [__0x.multiLineCursorText]: undefined,
    [__0x.multiLineAnchorText]: undefined,
    [__0x.multiCursorText]: undefined,
} as const;

export const DIAGNOSTIC_CONTENT_TEXT = {
    [__0x.allOkOverride]: [] as any[],
    [__0x.allOkNoOverride]: [] as any[],
    [__0x.editorOkWorkspaceWarn]: [] as any[],
    [__0x.editorOkWorkspaceErr]: [] as any[],
    [__0x.editorOkWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarn]: [] as any[],
    [__0x.editorWarnWorkspaceErr]: [] as any[],
    [__0x.editorWarnWorkspaceWarnErr]: [] as any[],
    [__0x.editorErrWorkspaceErr]: [] as any[],
    [__0x.editorErrWorkspaceWarnErr]: [] as any[],
    [__0x.editorWarnErrWorkspaceWarnErr]: [] as any[],
} as const;

export const DIAGNOSTIC_PROBLEM_LIST = [
    __0x.editorOkWorkspaceWarn,
    __0x.editorOkWorkspaceErr,
    __0x.editorOkWorkspaceWarnErr,
    __0x.editorWarnWorkspaceWarn,
    __0x.editorWarnWorkspaceErr,
    __0x.editorWarnWorkspaceWarnErr,
    __0x.editorErrWorkspaceErr,
    __0x.editorErrWorkspaceWarnErr,
    __0x.editorWarnErrWorkspaceWarnErr,
] as const;

export const DIAGNOSTIC_GLYPH = {
    [__0x.openningBracket]: undefined,
    [__0x.closingBracket]: undefined,    
    [__0x.lineEqual]: undefined,
    [__0x.lineUp]: undefined,
    [__0x.lineDown]: undefined,
} as const;

export const DIAGNOSTIC_ENTRY_LIST = [
    __0x.allOkOverride,
    __0x.allOkNoOverride,
    ...DIAGNOSTIC_PROBLEM_LIST
];

export const DIAGNOSTIC_EDITOR_CONTENT_TEXT_KEYSET = {
    [__0x.okContentText]: __0x.okEditorContentText,
    [__0x.warningContentText]: __0x.warningEditorContentText,
    [__0x.errorContentText]: __0x.errorEditorContentText
};

export const DIAGNOSTIC_WORKSPACE_CONTENT_TEXT_KEYSET = {
    [__0x.okContentText]: __0x.okWorkspaceContentText,
    [__0x.warningContentText]: __0x.warningWorkspaceContentText,
    [__0x.errorContentText]: __0x.errorWorkspaceContentText
} as const;