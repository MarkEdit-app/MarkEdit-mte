import { Alignment, TableEditor, defaultOptions as options } from '@tgrosinger/md-advanced-tables';

export const keyBindings = (tableEditor: TableEditor) => tableActions(tableEditor).map(([key, action]) => ({
  key,
  preventDefault: true,
  run: () => {
    if (tableEditor.cursorIsInTable(options)) {
      action();
      return true;
    }

    return false;
  },
}));

const tableActions = (tableEditor: TableEditor) => Object.entries({
  'Tab': () => tableEditor.nextCell(options),
  'Shift-Tab': () => tableEditor.previousCell(options),
  'Enter': () => tableEditor.nextRow(options),
  'Cmd-Enter': () => tableEditor.escape(options),
  'Shift-Cmd-ArrowLeft': () => tableEditor.alignColumn(Alignment.LEFT, options),
  'Shift-Cmd-ArrowRight': () => tableEditor.alignColumn(Alignment.RIGHT, options),
  'Shift-Cmd-ArrowUp': () => tableEditor.alignColumn(Alignment.CENTER, options),
  'Shift-Cmd-ArrowDown': () => tableEditor.alignColumn(Alignment.NONE, options),
  'Cmd-ArrowLeft': () => tableEditor.moveFocus(0, -1, options),
  'Cmd-ArrowRight': () => tableEditor.moveFocus(0, 1, options),
  'Cmd-ArrowUp': () => tableEditor.moveFocus(-1, 0, options),
  'Cmd-ArrowDown': () => tableEditor.moveFocus(1, 0, options),
  'Cmd-k Cmd-i': () => tableEditor.insertRow(options),
  'Cmd-l Cmd-i': () => tableEditor.deleteRow(options),
  'Cmd-k Cmd-j': () => tableEditor.insertColumn(options),
  'Cmd-l Cmd-j': () => tableEditor.deleteColumn(options),
  'Alt-Shift-Cmd-ArrowLeft': () => tableEditor.moveColumn(-1, options),
  'Alt-Shift-Cmd-ArrowRight': () => tableEditor.moveColumn(1, options),
  'Alt-Shift-Cmd-ArrowUp': () => tableEditor.moveRow(-1, options),
  'Alt-Shift-Cmd-ArrowDown': () => tableEditor.moveRow(1, options),
});
