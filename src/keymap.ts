import { KeyBinding } from '@codemirror/view';
import { Alignment, TableEditor, defaultOptions as options } from '@tgrosinger/md-advanced-tables';

export const keyBindings = (tableEditor: TableEditor) => tableActions(tableEditor).map(([key, action]) => ({
  key,
  preventDefault: false,
  run: () => {
    if (tableEditor.cursorIsInTable(options)) {
      action();
      return true;
    }

    return false;
  },
} as KeyBinding));

const tableActions = (tableEditor: TableEditor) => Object.entries({
  'Shift-Cmd-f': () => tableEditor.format(options),
  'Alt-Shift-Cmd-f': () => tableEditor.formatAll(options),
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
  'Alt-Shift-Cmd-ArrowLeft': () => tableEditor.moveColumn(-1, options),
  'Alt-Shift-Cmd-ArrowRight': () => tableEditor.moveColumn(1, options),
  'Alt-Shift-Cmd-ArrowUp': () => tableEditor.moveRow(-1, options),
  'Alt-Shift-Cmd-ArrowDown': () => tableEditor.moveRow(1, options),
  // Instead of using consecutive bindings like "Cmd-k Cmd-i", we have to handle states manually.
  // The reason is that "Cmd-k Cmd-i" stops propagation for "Cmd-k", which might be used in the app.
  'Cmd-k': () => {
    states.pendingInsert = true;
    states.pendingDelete = false;
  },
  'Cmd-l': () => {
    states.pendingDelete = true;
    states.pendingInsert = false;
  },
  'Cmd-i': () => {
    if (states.pendingInsert) {
      tableEditor.insertRow(options);
    }
    if (states.pendingDelete) {
      tableEditor.deleteRow(options);
    }
  },
  'Cmd-j': () => {
    if (states.pendingInsert) {
      tableEditor.insertColumn(options);
    }
    if (states.pendingDelete) {
      tableEditor.deleteColumn(options);
    }
  },
});

// Reset states with a general keydown observer
document.addEventListener('keydown', event => {
  const onlyMetaKey = event.metaKey && !(event.ctrlKey || event.altKey || event.shiftKey);
  if (!onlyMetaKey || event.key !== 'k') {
    states.pendingInsert = false;
  }
  if (!onlyMetaKey || event.key !== 'l') {
    states.pendingDelete = false;
  }
});

const states = {
  pendingInsert: false,
  pendingDelete: false,
};
