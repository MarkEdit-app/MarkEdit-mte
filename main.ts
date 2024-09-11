import { keymap } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { TableEditor } from '@tgrosinger/md-advanced-tables';
import { TextEditor } from './src/editor';
import { keyBindings } from './src/keymap';
import { MarkEdit } from 'markedit-api';

const textEditor = new TextEditor(MarkEdit.editorAPI);
const tableEditor = new TableEditor(textEditor);

const keymapExtension = keymap.of(keyBindings(tableEditor));
MarkEdit.addExtension(Prec.highest(keymapExtension));
