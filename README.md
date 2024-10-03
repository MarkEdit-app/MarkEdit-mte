# MarkEdit-mte

Markdown Table Editor for MarkEdit that leverages [markedit-api](https://github.com/MarkEdit-app/MarkEdit-api).

Learn more about [mte-kernel](https://github.com/susisu/mte-kernel).

## Installation

Copy [dist/markedit-mte.js](dist/markedit-mte.js) to `~/Library/Containers/app.cyan.markedit/Data/Documents/scripts/`.

You can also run `yarn install && yarn build` to build and deploy the script.

## Quick Guide

1. Input a pipe `|` and some content (cursor position is indicated by `_`).

```
| foo_
```

2. Hit Tab to move to the next cell.

```
| foo | _
| --- |
```

3. Continue typing.

```
| foo | bar | _
| --- | --- |
```

4. Hit Enter to move to the next row.

```
| foo | bar |
| --- | --- |
| _   |     |
```

5. Continue typing...

```
| foo | bar |
| --- | --- |
| baz | _   |
```

6. Hit Cmd-Enter to finish editing the table.

```
| foo | bar |
| --- | --- |
| baz |     |
_
```

## Commands

### Basic Commands

| Command       | Description               | Keymap          |
| ------------- | ------------------------- | ----------------|
| Format        | Format the current table  | Shift-Cmd-f     |
| Format All    | Format all tables         | Alt-Shift-Cmd-f |
| Next Cell     | Move to the next cell     | Tab             |
| Previous Cell | Move to the previous cell | Shift-Tab       |
| Next Row      | Move to the next row      | Enter           |
| Escape        | Escape from the table     | Cmd-Enter       |

### Move Focus

| Command    | Description      | Keymap    |
| ---------- | ---------------- | ----------|
| Move Left  | Move focus left  | Cmd-Left  |
| Move Right | Move focus right | Cmd-Right |
| Move Up    | Move focus up    | Cmd-Up    |
| Move Down  | Move focus down  | Cmd-Down  |

### Alignment

| Command      | Description           | Keymap          |
| ------------ | --------------------- | ----------------|
| Align Left   | Align a column left   | Shift-Cmd-Left  |
| Align Right  | Align a column right  | Shift-Cmd-Right |
| Align Center | Align a column center | Shift-Cmd-Up    |
| Align None   | Unset alignment       | Shift-Cmd-Down  |

### Row/Column Operations

| Command           | Description            | Keymap              |
| ----------------- | ---------------------- | --------------------|
| Insert Row        | Insert an empty row    | Cmd-K Cmd-I         |
| Delete Row        | Delete a row           | Cmd-L Cmd-I         |
| Insert Column     | Insert an empty column | Cmd-K Cmd-J         |
| Delete Column     | Delete a column        | Cmd-L Cmd-J         |
| Move Row Up       | Move a row up          | Alt-Shift-Cmd-Up    |
| Move Row Down     | Move a row down        | Alt-Shift-Cmd-Down  |
| Move Column Left  | Move a column left     | Alt-Shift-Cmd-Left  |
| Move Column Right | Move a column right    | Alt-Shift-Cmd-Right |
