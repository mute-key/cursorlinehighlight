### Backlog

```

- [!] mutlti cursor selection lags and slow down on rapid-fire. need faster response and better performance. 
- [!] direct config update from json leaves selection status text. 

==========================================================================================================
- [?] throttling for multi-line selection and multi-cursor selection
- [?] backgroundColor configuration or auto appply background color based on border colour. not sure yet.
==========================================================================================================
- [o] preset format and color preset
- [o] changing config recreate all decoroation, de-refernce to previous decoroationType from the object.
- [o] config diversify for differernt selection type and fully programmable config
    + cursorOnly
    + singleLine
    + multiLine
    + multiCursor
- [o] apply decoration on differernt selection type
- [o] more config options, global opacity configuration
- [o] config update on change without window reload.
- [o] more config option incude border position, more border options.
- [o] border position flips on mult-line selection, border on top on start pos, border on bottom on end pos.
- [o] range coordinator on different border position
- [o] border-type added/removed.
    + cursorOnly: bottom | before cursor.
    + cursorOnly: bottom | after cursor.
- [o] border width no longer template literals. re-implemented in numeric enum.
- [o] border width data tree to const object literal.
- [o] more configuration, background colors. and background opacity for all decoration types.
- [o] auto dismiss message when configuration change.
- [o] fixed a bug where not activating when inital load without active editor, e,g settings.
    * entry function will load all config whether if active editor is present or not and bind all events with config.
    * changing editor will trigger its event, starting to apply decoraiton on active editor, workign as intanded.
- [o] editor ui config overwrite for line highlight to gutter and cursor style and false to rounded selection.
- [o] config info object literal moved to constant.ts.
- [o] inline status text has been added. 
    - cursorOnly: 
    - singleLine: 
    - multiLine: 
    - multiCursor: 
- [o] better optimisation. i want faster response on cursor/selection change.
```