import { TableEditor, defaultOptions as options } from '@tgrosinger/md-advanced-tables';
import { MenuItem } from 'markedit-api';

export function createMenu(editor: TableEditor): MenuItem {
  return {
    title: 'Table Editor',
    children: [
      {
        title: 'Format',
        key: 'f',
        modifiers: ['Shift', 'Command'],
        action: () => editor.format(options),
      },
      {
        title: 'Format All',
        key: 'f',
        modifiers: ['Option', 'Shift', 'Command'],
        action: () => editor.formatAll(options),
      },
      { separator: true },
      {
        title: 'Home Page',
        action: () => open('https://github.com/MarkEdit-app/MarkEdit-mte', '_blank'),
      },
    ],
  };
}
