"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);

// src/cursor.ts
var vscode5 = __toESM(require("vscode"));

// src/config.ts
var vscode3 = __toESM(require("vscode"));

// src/util.ts
var vscode = __toESM(require("vscode"));
var sendAutoDismissMessage = (text, dismiss) => {
  const message = vscode.window.showInformationMessage(text);
  setTimeout(() => {
    message?.then(() => {
    });
  }, dismiss);
};
var fixConfuration = (confingError) => {
  console.log(confingError);
  vscode.window.showErrorMessage(
    "Invalid Value(s) in Configuration.",
    ...["Fix Configuration", "Ignore"]
  ).then((selection) => {
    if (selection === "Fix Configuration") {
      vscode.commands.executeCommand("workbench.action.openSettings", confingError.join(" "));
    }
  });
};
var isValidHexColor = (color) => /^#[A-Fa-f0-9]{6}$/.test(color);
var isValidWidth = (width) => /^[0-9]px$|^[0-9]em$/.test(width);
var regex = {
  indentRegex: (indentSize) => new RegExp(`^( {${indentSize}}|[\r
]+)*$`, "gm"),
  tagRegex: /(\t|[\r\n]+)*$/gm
};
var readBits = (value, trueValue, falseValue, bitLength) => {
  let idx = bitLength ? bitLength : 4;
  const array = [];
  while (idx--) {
    if (value >> idx & 1) {
      array.push(trueValue);
    } else {
      array.push(falseValue);
    }
  }
  return array;
};
var fnv1aHash = (str) => {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    hash = hash >>> 0;
  }
  return hash.toString(16);
};
var capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
var hexToRgbaStringLiteral = (hex, opacity = 0.6, defaultValue, opacityDefault) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  const regex2 = /^[0-9A-Fa-f]{6}$/;
  if (!regex2.test(hex)) {
    hex = defaultValue.replace(/^#/, "");
    opacity = opacityDefault;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// src/constant/object.ts
var CONFIG_INFO = {
  name: void 0,
  config: void 0,
  configHashKey: void 0,
  status: {
    position: void 0,
    decorationType: void 0,
    indent: {
      size: void 0,
      type: void 0
    }
  },
  decorationList: {
    CURSOR_ONLY: void 0,
    SINGLE_LINE: void 0,
    MULTI_LINE: void 0,
    MULTI_CURSOR: void 0
  },
  borderPositionInfo: {
    CURSOR_ONLY: void 0,
    SINGLE_LINE: void 0,
    MULTI_LINE: void 0,
    MULTI_CURSOR: void 0
  },
  generalConfigInfo: {
    borderOpacity: void 0,
    backgroundOpacity: void 0,
    // borderWidth: undefined,
    // borderColor: undefined,
    // backgroundColor: undefined,
    statusTextEnabled: void 0,
    statusTextColor: void 0,
    statusTextOpacity: void 0,
    statusTextBackgroundColor: void 0
  },
  configError: void 0
};
var APPLIED_DECORATION = {
  applied: void 0,
  editorDecoration: void 0
};
var SINGLE_BORDER_SELECTION = {
  ["none" /* NONE */]: [
    0 /* NONE */
  ],
  ["bottom" /* BOTTOM */]: [
    2 /* BOTTOM */,
    0 /* NONE */
  ],
  ["top-bottom" /* TOP_BOTTOM */]: [
    10 /* TOP_BOTTOM */
  ],
  ["top-right-bottom-left" /* TOP_RIGHT_BOTTOM_LEFT */]: [
    15 /* TOP_RIGHT_BOTTOM_LEFT */,
    0 /* NONE */
  ],
  ["left" /* LEFT */]: [
    1 /* LEFT */
  ]
};
var MULTILINE_BORDER_SELECTION = {
  ["none" /* NONE */]: [
    0 /* NONE */,
    0 /* NONE */,
    0 /* NONE */
  ],
  ["top-bottom" /* TOP_BOTTOM */]: [
    8 /* TOP */,
    2 /* BOTTOM */,
    0 /* NONE */
  ],
  ["left" /* LEFT */]: [
    1 /* LEFT */,
    1 /* LEFT */,
    1 /* LEFT */
  ]
};
var BORDER_WIDTH_DEFINITION = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: SINGLE_BORDER_SELECTION,
  ["SINGLE_LINE" /* SINGLE_LINE */]: SINGLE_BORDER_SELECTION,
  ["MULTI_LINE" /* MULTI_LINE */]: MULTILINE_BORDER_SELECTION,
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: SINGLE_BORDER_SELECTION
};
var DECORATION_INFO = {
  ["RESET" /* RESET */]: {
    KEY: "RESET" /* RESET */,
    MASK: 15 /* RESET */
  },
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: {
    KEY: "CURSOR_ONLY" /* CURSOR_ONLY */,
    MASK: 1 /* CURSOR_ONLY */
  },
  ["SINGLE_LINE" /* SINGLE_LINE */]: {
    KEY: "SINGLE_LINE" /* SINGLE_LINE */,
    MASK: 2 /* SINGLE_LINE */
  },
  ["MULTI_LINE" /* MULTI_LINE */]: {
    KEY: "MULTI_LINE" /* MULTI_LINE */,
    MASK: 4 /* MULTI_LINE */
  },
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: {
    KEY: "MULTI_CURSOR" /* MULTI_CURSOR */,
    MASK: 8 /* MULTI_CURSOR */
  }
};
var DECORATION_STYLE_PREFIX = {
  CURSOR_ONLY: "cursorOnly",
  SINGLE_LINE: "singleLine",
  MULTI_LINE: "multiLine",
  MULTI_CURSOR: "multiCursor"
};
var NO_CONFIGURATION_GENERAL_DEFAULT = {
  ["borderOpacity" /* OPACITY */]: 1,
  ["backgroundOpacity" /* BACKGROUND_OPACITY */]: 0.5,
  ["statusTextEnabled" /* STATUS_TEXT_ENABLED */]: true,
  ["statusTextColor" /* STATUS_TEXT_COLOR */]: "#FF0000",
  ["statusTextOpacity" /* STATUS_TEXT_OPACITY */]: 1,
  ["statusTextBackgroundColor" /* STATUS_TEXT_BACKGROUND_COLOR */]: null
};
var NO_CONFIGURATION_DEOCORATION_DEFAULT = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["SINGLE_LINE" /* SINGLE_LINE */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: false,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["MULTI_LINE" /* MULTI_LINE */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: true,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  },
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: {
    ["isWholeLine" /* IS_WHOLE_LINE */]: false,
    ["borderWidth" /* BORDER_WIDTH */]: "2px",
    ["borderStyle" /* BORDER_STYLE */]: "dotted",
    ["borderColor" /* BORDER_COLOR */]: "#ff0000",
    ["borderPosition" /* BORDER_POSITION */]: "bottom",
    ["backgroundColor" /* BACKGROUND_COLOR */]: "#ff0000"
  }
};

// src/decoration.ts
var vscode2 = __toESM(require("vscode"));
var applyDecoration = (editor, decoraiton, range) => editor.setDecorations(decoraiton, range);
var createEditorDecorationType = (styleAppliedConfig) => vscode2.window.createTextEditorDecorationType(styleAppliedConfig);
var disposeDecoration = (decorationList) => decorationList.forEach((decorationType) => {
  decorationType.dispose();
});

// src/config.ts
var configInfo = { ...CONFIG_INFO };
var getConfigString = (configReady) => Object.entries(configReady.config).reduce((acc, [key, infoProp]) => {
  if (typeof infoProp === "string" || typeof infoProp === "number" || typeof infoProp === "boolean") {
    acc.push(infoProp);
  }
  return acc;
}, []).join("");
var getConfigHash = (configReady) => {
  const configString = getConfigString(configReady);
  return fnv1aHash(configString);
};
var setConfigHashKey = (configInfo2) => {
  configInfo2.configHashKey = fnv1aHash(getConfigString(configInfo2));
};
var ifConfigChanged = (configReady) => {
  const configHash = getConfigHash(configReady);
  if (configReady.configHashKey === configHash) {
    return false;
  } else {
    configReady.configError = [];
    configReady.config = vscode3.workspace.getConfiguration(configReady.name);
    configReady.configHashKey = configHash;
    if (configReady.configError.length === 0) {
      sendAutoDismissMessage("Config has been changed. Reloading configuration. (Messaage Dismiss in 2 second.)" /* RELOADING_CONFIG */, 1500);
    } else {
      sendAutoDismissMessage("error in config", 1500);
    }
    return true;
  }
};
var updateEachEditorConfiguration = (key, value) => {
  const editorConfig = vscode3.workspace.getConfiguration("editor");
  if (value === null || value === "null" || String(value).length === 0) {
    editorConfig.update(key, null, vscode3.ConfigurationTarget.Global);
  } else {
    editorConfig.update(key, value, vscode3.ConfigurationTarget.Global);
  }
};
var updateEditorConfiguration = (configReady) => {
  const editorConfig = vscode3.workspace.getConfiguration("editor");
  editorConfig.update("renderLineHighlight", "gutter", vscode3.ConfigurationTarget.Global);
  editorConfig.update("roundedSelection", false, vscode3.ConfigurationTarget.Global);
  editorConfig.update("cursorBlinking", "phase", vscode3.ConfigurationTarget.Global);
  const tabSize = editorConfig.get("tabSize");
  const insertSpaces = editorConfig.get("insertSpaces");
  configReady.status.indent.size = Number(tabSize ? tabSize : 4);
  configReady.status.indent.type = insertSpaces ? "\n" : "	";
  configReady.status.indent.regex = insertSpaces ? regex.indentRegex(configReady.status.indent.size) : regex.tagRegex;
};
var initialiseConfig = (context) => {
  const name = context.extension.packageJSON.name;
  if (!name) {
    return;
  }
  configInfo.name = name;
  configInfo.config = vscode3.workspace.getConfiguration(configInfo.name);
  if (!configInfo.name && !configInfo.config) {
    return;
  }
  const configReady = configInfo;
  if (!configReady.configError) {
    configReady.configError = [];
  }
  if (!configReady.configHashKey) {
    setConfigHashKey(configReady);
    updateEditorConfiguration(configReady);
  } else {
    if (!ifConfigChanged(configReady)) {
      return configReady;
    } else {
    }
  }
  if (createDecorationTypeBuilder(configReady)) {
    return configReady;
  }
  return;
};
var checkConfigKeyAndCast = (key, config) => {
  return key;
};
var configNameTransformer = (configNameString, configNameTransform) => configNameTransform.reduce((str, transform) => transform(str), configNameString);
var isConfigValueValid = (configInfo2, configPrefix, configNameString, value, defaultValue) => {
  const configName = configPrefix + configNameString;
  const configKeyWithScope = configInfo2.name + "." + configName;
  if (configName.toLocaleLowerCase().includes("bordercolor")) {
    if (!isValidHexColor(String(value))) {
      configInfo2.configError.push(configKeyWithScope);
      return defaultValue;
    }
  } else if (configName.toLocaleLowerCase().includes("backgroundcolor")) {
    if (value === null || value === "null" || String(value).length === 0) {
      updateEachEditorConfiguration(configKeyWithScope, null);
      return null;
    }
    if (!isValidHexColor(String(value))) {
      configInfo2.configError.push(configKeyWithScope);
      return defaultValue;
    }
  } else if (configName.toLocaleLowerCase().includes("borderwidth")) {
    if (!isValidWidth(String(value))) {
      configInfo2.configError.push(configKeyWithScope);
      return defaultValue;
    }
  }
  return value;
};
var getConfigValue = (configInfo2, configPrefix, configName, defaultValue, configNameTransform) => {
  try {
    let configNameString = configName;
    if (configNameTransform && configNameTransform.length) {
      configNameString = configNameTransformer(configName, configNameTransform);
    }
    const value = configInfo2.config.get(configPrefix + configNameString, defaultValue);
    if (value === void 0) {
      console.warn(`Config value for ${configName} is undefined or caused an error. Using default value.`);
    }
    return isConfigValueValid(configInfo2, configPrefix, configNameString, value, defaultValue);
  } catch (err) {
    console.error(`Failed to get config value for ${configPrefix + configName}:`, err);
    return defaultValue;
  }
};
var colorConfigTransform = {
  borderColor: {
    of: "borderOpacity",
    fn: (v, n, d) => hexToRgbaStringLiteral(v, n, d)
  },
  backgroundColor: {
    of: "backgroundOpacity",
    fn: (v, n, d) => hexToRgbaStringLiteral(v, n, d)
  }
};
var getConfigSet = (configInfo2, decorationKey) => {
  const configPrefix = DECORATION_STYLE_PREFIX[decorationKey];
  const defaultConfigDefinition = NO_CONFIGURATION_DEOCORATION_DEFAULT[decorationKey];
  return Object.entries(defaultConfigDefinition).reduce((config, [configName, defaultValue]) => {
    const configValue = getConfigValue(configInfo2, configPrefix, checkConfigKeyAndCast(configName, defaultConfigDefinition), defaultValue, [capitalize]);
    if (configValue !== void 0 && configValue !== null) {
      if (Object.hasOwn(colorConfigTransform, configName)) {
        const colorTransform = colorConfigTransform[configName];
        config[configName] = colorTransform.fn(configValue, configInfo2.generalConfigInfo[colorTransform.of], defaultValue);
      } else {
        config[configName] = configValue;
      }
    }
    return config;
  }, {});
};
var createDecorationType = (config, decorationKey) => (decorationTypeSplit2) => {
  try {
    const split = decorationTypeSplit2(config, decorationKey);
    if (!split || split.length === 0) {
      return;
    }
    const decorationTypeStack = split.reduce((styledConfig, str) => {
      const conf = { ...config };
      conf.borderWidth = str;
      styledConfig.push(conf);
      return styledConfig;
    }, []).reduce((textEditorDecoration, styleAppliedConfig) => {
      textEditorDecoration.push(createEditorDecorationType(styleAppliedConfig));
      return textEditorDecoration;
    }, []);
    if (decorationTypeStack.length === 0) {
      return;
    }
    return decorationTypeStack;
  } catch (err) {
    console.log("creating decoration type thrown error:", decorationKey, err);
    return;
  }
};
var decorationTypeSplit = (config, decorationKey) => {
  if (Object.hasOwn(BORDER_WIDTH_DEFINITION, decorationKey)) {
    if (Object.hasOwn(BORDER_WIDTH_DEFINITION[decorationKey], config.borderPosition)) {
      return borderPosition(config, BORDER_WIDTH_DEFINITION[decorationKey][config.borderPosition]);
    }
    return;
  }
  return;
};
var borderPosition = (config, borderWidthMask) => {
  const borderWidth = [];
  for (const bitMask of borderWidthMask) {
    const border = readBits(bitMask, config.borderWidth, "0");
    borderWidth.push(border.join(" "));
  }
  return borderWidth;
};
var borderPositionParser = (selectionType, borderPosition2) => {
  const position = borderPosition2.replaceAll(" ", "").split("|");
  let isWholeLine = false;
  let beforeCursor = false;
  let afterCursor = false;
  let atLineStart = false;
  let selectionOnly = false;
  if (position.length > 1) {
    isWholeLine = /isWholeLine/s.test(position[1]);
    beforeCursor = /beforeCursor/s.test(position[1]);
    afterCursor = /afterCursor/s.test(position[1]);
    atLineStart = /atLineStart/s.test(position[1]);
    selectionOnly = /selectionOnly/s.test(position[1]);
    if (selectionType === "MULTI_LINE" && position[0] === "left") {
      isWholeLine = true;
    }
  }
  return {
    isWholeLine,
    borderPosition: position[0],
    beforeCursor,
    afterCursor,
    atLineStart,
    selectionOnly
  };
};
var createDecorationTypeBuilder = (configReady) => {
  for (const key in configReady.generalConfigInfo) {
    configReady.generalConfigInfo[key] = getConfigValue(configReady, "", key, NO_CONFIGURATION_GENERAL_DEFAULT[key]);
  }
  for (const key in configReady.decorationList) {
    const selectionType = key;
    if (configReady.decorationList[selectionType]) {
      disposeDecoration(configReady.decorationList[selectionType]);
    }
    const configSet = getConfigSet(configReady, selectionType);
    const parsed = borderPositionParser(selectionType, configSet.borderPosition);
    configReady.borderPositionInfo[selectionType] = parsed;
    configSet.borderPosition = parsed.borderPosition;
    configSet.isWholeLine = parsed.isWholeLine;
    const decorationTypeList = createDecorationType(configSet, selectionType)(decorationTypeSplit);
    if (!decorationTypeList) {
      return false;
    }
    configReady.decorationList[selectionType] = decorationTypeList;
  }
  return true;
};

// src/selection.ts
var vscode4 = __toESM(require("vscode"));
var createRangeNNNN = (startLine, startChar, endLine, endChar) => {
  return new vscode4.Range(new vscode4.Position(startLine, startChar), new vscode4.Position(endLine, endChar));
};
var createRangeSPEP = (start, end) => {
  return new vscode4.Range(start, end);
};
var createRangeNNEP = (line, char, end) => {
  return new vscode4.Range(new vscode4.Position(line, char), end);
};
var statusOf = {
  ["CURSOR_ONLY" /* CURSOR_ONLY */]: {
    contentText: (col) => `< Editing ... At (Col ${col})`
  },
  ["SINGLE_LINE" /* SINGLE_LINE */]: {
    contentText: (characters) => `< Selection ... Of (${characters} Characters)`
  },
  ["MULTI_LINE" /* MULTI_LINE */]: {
    contentText: (lines, characters, position) => `< Selection ${position} ... Of (${lines} Lines, ${characters} Characters, Indent/EOL Ignored)`
  },
  ["MULTI_CURSOR" /* MULTI_CURSOR */]: {
    contentText: (nth, selectionCount, lines, characters) => `< Multi Selection ... Of (${nth} of ${selectionCount}, with Total ${lines} Lines ${characters} Characters )`
  }
};
var cursorOnlyStatus = (editor, type) => {
  return [{
    contentText: statusOf[type.KEY].contentText(editor.selection.active.character),
    range: createRangeSPEP(editor.selection.active, editor.selection.active),
    isWholeLine: true
  }];
};
var singleLineStatus = (editor, type) => {
  return [{
    contentText: statusOf[type.KEY].contentText(Math.abs(editor.selection.end.character - editor.selection.start.character)),
    range: createRangeSPEP(editor.selection.active, editor.selection.active),
    isWholeLine: true
  }];
};
var multilineStatus = (editor, status2, type) => {
  const text = editor.document.getText(editor.selection);
  const count = text.replace(status2.indent.regex, "").length;
  const args = Math.abs(editor.selection.end.line - editor.selection.start.line) + 1;
  return [{
    contentText: statusOf[type.KEY].contentText(args, count, "Anchor"),
    range: createRangeSPEP(editor.selection.anchor, editor.selection.anchor),
    isWholeLine: true
  }, {
    contentText: statusOf[type.KEY].contentText(args, count, "Cursor"),
    range: createRangeSPEP(editor.selection.active, editor.selection.active),
    isWholeLine: true
  }];
};
var multiCursorStatus = (editor, status2, type) => {
  let length = editor.selections.length;
  let idx = 0;
  let charCount = 0;
  let lineCount = 0;
  let isSingleLine = editor.selections[0].start.line === editor.selections[0].end.line;
  let lineDiff = 0;
  let lastEndline = 0;
  const statusInfo = [];
  const statusLine = [];
  if (isSingleLine) {
    lineDiff = 1;
  } else {
    lineDiff = Math.abs(editor.selections[0].end.line - editor.selections[0].start.line) + 1;
  }
  while (idx < length) {
    if (isSingleLine) {
      charCount = charCount + (editor.selections[idx].end.character - editor.selections[idx].start.character);
      lineCount = lineCount + lineDiff;
    } else {
      const text = editor.document.getText(editor.selections[idx]);
      charCount = charCount + text.replace(status2.indent.regex, "").length;
      lineCount = lineCount + lineDiff;
    }
    statusLine.push(editor.selections[idx].end.line);
    idx++;
  }
  idx = length;
  while (idx--) {
    if (lastEndline === editor.selections[idx].end.line) {
      continue;
    }
    statusInfo.push({
      contentText: statusOf[type.KEY].contentText(idx + 1, length, lineCount, charCount),
      range: createRangeSPEP(editor.selections[idx].start, editor.selections[idx].end),
      isWholeLine: true
    });
    lastEndline = editor.selections[idx].end.line;
    idx++;
  }
  return statusInfo;
};
var statusInfoSplit = (editor, status2, type) => {
  return {
    ["CURSOR_ONLY" /* CURSOR_ONLY */]: () => cursorOnlyStatus(editor, type),
    ["SINGLE_LINE" /* SINGLE_LINE */]: () => singleLineStatus(editor, type),
    ["MULTI_LINE" /* MULTI_LINE */]: () => multilineStatus(editor, status2, type),
    ["MULTI_CURSOR" /* MULTI_CURSOR */]: () => multiCursorStatus(editor, status2, type)
  };
};
var statusDecorationType = (statusInfo, generalConfig) => {
  const textColor = generalConfig.statusTextColor;
  const textOpacity = generalConfig.statusTextOpacity;
  const defaultColor = NO_CONFIGURATION_GENERAL_DEFAULT.statusTextColor;
  const defaultOpacity = NO_CONFIGURATION_GENERAL_DEFAULT.statusTextOpacity;
  return {
    isWholeLine: statusInfo.isWholeLine,
    rangeBehavior: vscode4.DecorationRangeBehavior.ClosedClosed,
    after: {
      contentText: statusInfo.contentText,
      color: hexToRgbaStringLiteral(textColor, textOpacity, defaultColor, defaultOpacity),
      backgroundColor: void 0,
      fontWeight: "light",
      fontStyle: "italic",
      textDecoration: "none",
      margin: "0 0 0 20px"
    }
  };
};
var setStatusInfoDecoration = (editor, statusInfo, generalConfig) => {
  const statusInfoList = [];
  let length = statusInfo.length;
  while (length--) {
    const editorDecoration = createEditorDecorationType(statusDecorationType(statusInfo[length], generalConfig));
    applyDecoration(editor, editorDecoration, [statusInfo[length].range]);
    statusInfoList.push(editorDecoration);
  }
  return statusInfoList;
};
var disposeStatusInfo = (status2) => {
  let length = status2.decorationType.length;
  while (length--) {
    status2.decorationType[length].dispose();
  }
};
var status = (editor, status2, generalConfig, type) => {
  const statusInfo = statusInfoSplit(editor, status2, type)[type.KEY]();
  if (status2.decorationType) {
    disposeStatusInfo(status2);
    status2.decorationType = void 0;
    status2.decorationType = setStatusInfoDecoration(editor, statusInfo, generalConfig);
  } else {
    status2.decorationType = setStatusInfoDecoration(editor, statusInfo, generalConfig);
  }
};
var cursorOnlyDecorationWithRange = (context) => {
  const { editor, borderConfig, textEditorDecoration } = context;
  if (borderConfig.isWholeLine) {
    return [{
      decoration: textEditorDecoration[0],
      range: [createRangeSPEP(editor.selection.active, editor.selection.active)]
    }];
  }
  if (borderConfig.beforeCursor) {
    return [{
      decoration: textEditorDecoration[0],
      range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
    }];
  }
  if (borderConfig.afterCursor) {
    return [
      {
        decoration: textEditorDecoration[0],
        range: [createRangeNNEP(
          editor.selection.active.line,
          editor.selection.active.character,
          editor.document.lineAt(editor.selection.active.line).range.end
        )]
      },
      {
        decoration: textEditorDecoration[1],
        range: [createRangeNNNN(editor.selection.active.line, 0, editor.selection.active.line, editor.selection.active.character)]
      }
    ];
  }
  return [];
};
var singelLineDecorationWithRange = ({ editor, borderConfig, textEditorDecoration }) => {
  return [{
    decoration: textEditorDecoration[0],
    range: [createRangeSPEP(editor.selection.start, editor.selection.end)]
  }];
};
var multiLineDecorationWithRange = ({ editor, borderConfig, textEditorDecoration }) => {
  if (borderConfig.borderPosition === "left") {
    return [{
      decoration: textEditorDecoration[2],
      range: [createRangeNNNN(editor.selection.start.line, editor.selection.start.character, editor.selection.end.line, editor.selection.end.character)]
    }];
  } else {
    const decorationWithRange = [];
    decorationWithRange.push(...[
      {
        decoration: textEditorDecoration[0],
        range: [createRangeSPEP(editor.selection.start, editor.selection.start)]
      },
      {
        decoration: textEditorDecoration[1],
        range: [createRangeSPEP(editor.selection.end, editor.selection.end)]
      }
    ]);
    if (Math.abs(editor.selection.start.line - editor.selection.end.line) > 1) {
      decorationWithRange.push({
        decoration: textEditorDecoration[2],
        range: [createRangeNNNN(editor.selection.start.line + 1, editor.selection.start.character, editor.selection.end.line - 1, editor.selection.end.character)]
      });
    } else {
      applyDecoration(editor, textEditorDecoration[2], []);
    }
    return decorationWithRange;
  }
};
var multiCursorDecorationWithRange = ({ editor, borderConfig, textEditorDecoration }) => {
  return [
    {
      decoration: textEditorDecoration[0],
      range: editor.selections.reduce((acc, selection) => {
        acc.push(createRangeSPEP(selection.start, selection.active));
        return acc;
      }, [])
    },
    {
      decoration: textEditorDecoration[1],
      range: editor.selections.reduce((acc, selection) => {
        acc.push(createRangeNNNN(selection.active.line, 0, selection.active.line, selection.active.character));
        return acc;
      }, [])
    }
  ];
};

// src/cursor.ts
var setDecorationOnEditor = ({ editor, decorationList, decorationInfo, loadConfig }) => {
  const textEditorDecoration = decorationList[decorationInfo.KEY];
  if (textEditorDecoration) {
    appliedDecoration.editorDecoration = textEditorDecoration;
    const decorationWithRange = decorationCoordinator({ editor, decorationList, decorationInfo, loadConfig });
    if (!decorationWithRange) {
      return;
    }
    isDecorationChanged(loadConfig, editor, appliedDecoration, decorationInfo);
    decorationWithRange.forEach(({ decoration, range }) => {
      applyDecoration(editor, decoration, range);
    });
  }
};
var decorationCoordinator = ({ editor, decorationList, decorationInfo, loadConfig }) => {
  const textEditorDecoration = decorationList[decorationInfo.KEY];
  if (textEditorDecoration) {
    const borderConfig = loadConfig.borderPositionInfo[decorationInfo.KEY];
    if (loadConfig.generalConfigInfo.statusTextEnabled) {
      status(editor, loadConfig.status, loadConfig.generalConfigInfo, decorationInfo);
    }
    const context = {
      editor,
      borderConfig,
      textEditorDecoration
    };
    const fnSplit = {
      ["CURSOR_ONLY" /* CURSOR_ONLY */]: () => cursorOnlyDecorationWithRange(context),
      ["SINGLE_LINE" /* SINGLE_LINE */]: () => singelLineDecorationWithRange(context),
      ["MULTI_LINE" /* MULTI_LINE */]: () => multiLineDecorationWithRange(context),
      ["MULTI_CURSOR" /* MULTI_CURSOR */]: () => multiCursorDecorationWithRange(context)
    };
    return fnSplit[decorationInfo.KEY]();
  }
  return;
};
var appliedDecoration = { ...APPLIED_DECORATION };
var resetLastAppliedDecoration = (editor, decorationType) => {
  decorationType.forEach((decoration) => {
    applyDecoration(editor, decoration, []);
  });
};
var isDecorationChanged = (config, editor, appliedDecoration2, decorationInfo) => {
  if (appliedDecoration2.applied) {
    if (appliedDecoration2.applied.MASK !== decorationInfo.MASK) {
      resetLastAppliedDecoration(editor, config.decorationList[appliedDecoration2.applied.KEY]);
      appliedDecoration2.applied = decorationInfo;
      return true;
    }
    return false;
  }
  appliedDecoration2.applied = decorationInfo;
  return true;
};
var cursorActivate = async (context) => {
  try {
    await context.extension.activate();
    const loadConfig = initialiseConfig(context);
    if (!loadConfig) {
      console.error("Failed to initialize config.");
      return;
    }
    if (!loadConfig.decorationList) {
      console.error("Failed to initialize decorationList.");
      return;
    }
    const activeEditor = vscode5.window.activeTextEditor;
    if (loadConfig.configError.length > 0) {
      fixConfuration(loadConfig.configError);
    }
    if (activeEditor) {
      setDecorationOnEditor({
        editor: activeEditor,
        decorationList: loadConfig.decorationList,
        decorationInfo: DECORATION_INFO.CURSOR_ONLY,
        loadConfig
      });
    }
    return [
      onActiveWindowChange(loadConfig),
      activeEditorChanged(loadConfig),
      selectionChanged(loadConfig),
      editorOptionChange(loadConfig),
      configChanged(context)
    ];
  } catch (err) {
    console.error("Error during extension activation: ", err);
    vscode5.window.showErrorMessage("Extension activation failed!", err);
  }
};
var getSelectionType = (editor) => {
  if (editor.selections.length === 1) {
    if (editor.selections[0].isEmpty) {
      return DECORATION_INFO.CURSOR_ONLY;
    } else {
      if (editor.selections[0].isSingleLine) {
        return DECORATION_INFO.SINGLE_LINE;
      } else {
        return DECORATION_INFO.MULTI_LINE;
      }
    }
  } else if (editor.selections.length > 1) {
    return DECORATION_INFO.MULTI_CURSOR;
  }
};
var editorIndentOption = (config, editor) => {
  config.status.indent.size = Number(editor.options.tabSize ?? editor.options.indentSize ?? 4);
  config.status.indent.type = editor.options.insertSpaces ? "\n" : "	";
  config.status.indent.regex = editor.options.insertSpaces ? regex.indentRegex(config.status.indent.size) : regex.tagRegex;
};
var resetDecoration = (config, editor, dispose) => (decorationInfo) => {
  if (editor) {
    config.status.decorationType?.forEach((decorationType) => {
      decorationType.dispose();
    });
    config.decorationList[decorationInfo.KEY]?.forEach((decorationType) => {
      if (Array.isArray(decorationType)) {
        decorationType.forEach((decorationType2) => {
          applyDecoration(editor, decorationType2, []);
          if (dispose) {
          }
        });
      } else {
        applyDecoration(editor, decorationType, []);
        if (dispose) {
        }
      }
    });
    return true;
  }
  return false;
};
var resetDecorationWrapper = (config, editor, dispose) => {
  const resetFunction = (decorationInfo) => {
    return resetDecoration(config, editor, dispose)(decorationInfo);
  };
  resetOtherDecoration(DECORATION_INFO.RESET, resetFunction);
};
var resetOtherDecoration = (currentDecoration, reset) => Object.values(DECORATION_INFO).filter((info) => currentDecoration.MASK & info.MASK).map((info) => reset(info)).every(Boolean);
var onActiveWindowChange = (config) => {
  return vscode5.window.onDidChangeWindowState((event) => {
    if (event.focused) {
      if (vscode5.window.activeTextEditor) {
        setDecorationOnEditor({
          editor: vscode5.window.activeTextEditor,
          decorationList: config.decorationList,
          decorationInfo: DECORATION_INFO.CURSOR_ONLY,
          loadConfig: config
        });
      }
    } else {
      vscode5.window.visibleTextEditors.forEach((editor) => {
        resetDecorationWrapper(config, editor);
      });
    }
  });
};
var activeEditorChanged = (config) => {
  return vscode5.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      if (config.configError.length > 0) {
        fixConfuration(config.configError);
      }
      editorIndentOption(config, editor);
      vscode5.window.visibleTextEditors.forEach((editor2) => {
        if (appliedDecoration.editorDecoration !== void 0) {
          appliedDecoration.editorDecoration.forEach((decoration) => {
            applyDecoration(editor2, decoration, []);
          });
        }
      });
      setDecorationOnEditor({
        editor,
        decorationList: config.decorationList,
        decorationInfo: DECORATION_INFO.CURSOR_ONLY,
        loadConfig: config
      });
    }
  });
};
var editorOptionChange = (config) => {
  return vscode5.window.onDidChangeTextEditorOptions((event) => {
    editorIndentOption(config, event.textEditor);
  });
};
var selectionChanged = (config) => {
  return vscode5.window.onDidChangeTextEditorSelection((event) => {
    if (event.selections) {
      const decorationType = getSelectionType(event.textEditor);
      if (!decorationType) {
        return;
      }
      isDecorationChanged(config, event.textEditor, appliedDecoration, decorationType);
      if (!config.decorationList[decorationType.KEY]) {
        return;
      }
      setDecorationOnEditor({
        editor: event.textEditor,
        decorationList: config.decorationList,
        decorationInfo: decorationType,
        loadConfig: config
      });
    }
  });
};
var configChanged = (context) => {
  return vscode5.workspace.onDidChangeConfiguration((event) => {
    if (event) {
      const configReady = initialiseConfig(context);
      if (configReady) {
      }
    }
  });
};

// src/extension.ts
function activate(context) {
  cursorActivate(context).then((event) => {
    if (event) {
      context.subscriptions.push(...event);
    }
  });
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
