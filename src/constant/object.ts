import { CommentThreadCollapsibleState } from 'vscode';
import * as Type from '../type/type.d';

import {
    BORDER_POSITION_MASK,
    BORDER_POSITION_VARIATION,
    DECORATION_STYLE_CONFIG_KEY,
    DECORATION_GENERAL_STYLE_CONFIG_KEY,
    DECORATION_STATUS_STYLE_CONFIG_KEY,
    DECORATION_STYLE_KEY,
    DECORATION_TYPE_MASK,
    SELECTION_TYPE
} from './enum';

// ==============================================================================
// [ RUNTIME READONLY CONSTANT/ENUM ]
// ==============================================================================

/**
 * readonly config object lteral structure.
 * import, shallow copy, as Type.ConfigInfoType.
 * 
 * workspace configuration could have been 'default' but
 * i think undefined is more difinitive for unset default value.
 * 
 * i think need to split this into 2 to static and dynamic.
 * this is getting to heavy to read.
 * 
 */
export const CONFIG_INFO = {
    name: undefined,
    config: undefined,
    configHashKey: undefined,
    borderPositionInfo: {
        CURSOR_ONLY: undefined,
        SINGLE_LINE: undefined,
        MULTI_LINE: undefined,
        MULTI_CURSOR: undefined,
    } as const,
    generalConfigInfo: {
        borderOpacity: undefined,
        backgroundOpacity: undefined,
        statusTextEnabled: undefined,
    } as const,
    statusTextConfig: {
        statusTextColor: undefined,
        statusTextOpacity: undefined,
        statusTextBackgroundColor: undefined,
        statusTextFontStyle: undefined,
        statusTextFontWeight: undefined
    } as const,
    configError: undefined,
} as const;

/**
 * 
 */
export const STATUS_INFO = {
    indent: {
        size: undefined,
        type: undefined,
        regex: undefined
    } as const,
    statusText: {
        isWholeLine: undefined,
        rangeBehavior: undefined,
        after: {
            contentText: undefined,
            color: undefined,
            backgroundColor: undefined,
            fontWeight: undefined,
            fontStyle: undefined,
            textDecoration: 'none',
            margin: '0 0 0 20px',
        } as const
    } as const,
} as const;

/**
 * decoration state object to set or unset decorations on editor.
 * to be used as shallow copied object.
 */
export const DECORATION_STATE = {
    decorationList: {
        CURSOR_ONLY: undefined,
        SINGLE_LINE: undefined,
        MULTI_LINE: undefined,
        MULTI_CURSOR: undefined,
    } as const,
    appliedDecoration: {
        applied: undefined,
        editorDecoration: undefined
    } as const,
    statusText: undefined,
};


/**
 *  
 * 
 */
export const SINGLE_BORDER_SELECTION = {
    [BORDER_POSITION_VARIATION.NONE]: [
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.BOTTOM]: [
        BORDER_POSITION_MASK.BOTTOM,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_BOTTOM]: [
        BORDER_POSITION_MASK.TOP_BOTTOM
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_RIGHT_BOTTOM_LEFT]: [
        BORDER_POSITION_MASK.TOP_RIGHT_BOTTOM_LEFT,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.LEFT]: [
        BORDER_POSITION_MASK.LEFT
    ] as const,
} as const;

/**
 * use only for multiline single selection.
 * 
 */
export const MULTILINE_BORDER_SELECTION = {
    [BORDER_POSITION_VARIATION.NONE]: [
        BORDER_POSITION_MASK.NONE,
        BORDER_POSITION_MASK.NONE,
        BORDER_POSITION_MASK.NONE,
    ] as const,
    [BORDER_POSITION_VARIATION.TOP_BOTTOM]: [
        BORDER_POSITION_MASK.TOP,
        BORDER_POSITION_MASK.BOTTOM,
        BORDER_POSITION_MASK.NONE
    ] as const,
    [BORDER_POSITION_VARIATION.LEFT]: [
        BORDER_POSITION_MASK.LEFT,
        BORDER_POSITION_MASK.LEFT,
        BORDER_POSITION_MASK.LEFT,
    ] as const,
} as const;

export const BORDER_WIDTH_DEFINITION = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: SINGLE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.SINGLE_LINE]: SINGLE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.MULTI_LINE]: MULTILINE_BORDER_SELECTION,
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: SINGLE_BORDER_SELECTION,
} as const;

export const DECORATION_INFO: Type.DecorationInfoType = {
    [SELECTION_TYPE.RESET]: {
        KEY: SELECTION_TYPE.RESET,
        MASK: DECORATION_TYPE_MASK.RESET
    } as const,
    [SELECTION_TYPE.CURSOR_ONLY]: {
        KEY: SELECTION_TYPE.CURSOR_ONLY,
        MASK: DECORATION_TYPE_MASK.CURSOR_ONLY
    } as const,
    [SELECTION_TYPE.SINGLE_LINE]: {
        KEY: SELECTION_TYPE.SINGLE_LINE,
        MASK: DECORATION_TYPE_MASK.SINGLE_LINE
    } as const,
    [SELECTION_TYPE.MULTI_LINE]: {
        KEY: SELECTION_TYPE.MULTI_LINE,
        MASK: DECORATION_TYPE_MASK.MULTI_LINE
    } as const,
    [SELECTION_TYPE.MULTI_CURSOR]: {
        KEY: SELECTION_TYPE.MULTI_CURSOR,
        MASK: DECORATION_TYPE_MASK.MULTI_CURSOR
    } as const,
} as const;

/**
 * this prob could be const enum too but this needs to be used as an object
 * so this is object literal it is.
 * 
 */
export const DECORATION_STYLE_PREFIX = {
    CURSOR_ONLY: 'cursorOnly',
    SINGLE_LINE: 'singleLine',
    MULTI_LINE: 'multiLine',
    MULTI_CURSOR: 'multiCursor',
} as const;

/**
 * to protect runtime as well as notify user that malformed configuration value in setting.json.
 * 
 */
export const NO_CONFIGURATION_GENERAL_DEFAULT: Type.NoConfigurationGeneraType = {
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.OPACITY]: 1,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.BACKGROUND_OPACITY]: 0.5,
    [DECORATION_GENERAL_STYLE_CONFIG_KEY.STATUS_TEXT_ENABLED]: true,
} as const;

export const NO_CONFIGURATION_STATUS_DEFAULT: Type.NoConfigurationStatusType = {
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_COLOR]: '#FF0000',
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_OPACITY]: 1,
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_BACKGROUND_COLOR]: null,
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_FONT_STYLE]: 'normal',
    [DECORATION_STATUS_STYLE_CONFIG_KEY.STATUS_TEXT_FONT_WEIGHT]: 'bold',
} as const;

export const NO_CONFIGURATION_DEOCORATION_DEFAULT: Type.NoConfigurationDecorationType = {
    [DECORATION_STYLE_KEY.CURSOR_ONLY]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.SINGLE_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.MULTI_LINE]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: true,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
    [DECORATION_STYLE_KEY.MULTI_CURSOR]: {
        [DECORATION_STYLE_CONFIG_KEY.IS_WHOLE_LINE]: false,
        [DECORATION_STYLE_CONFIG_KEY.BORDER_WIDTH]: '2px',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_STYLE]: 'dotted',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_COLOR]: '#ff0000',
        [DECORATION_STYLE_CONFIG_KEY.BORDER_POSITION]: 'bottom',
        [DECORATION_STYLE_CONFIG_KEY.BACKGROUND_COLOR]: '#ff0000',
    } as const,
} as const;