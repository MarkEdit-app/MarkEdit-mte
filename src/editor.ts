import { ITextEditor, Point, Range } from '@tgrosinger/md-advanced-tables';
import { TextEditable } from 'markedit-api';

export class TextEditor extends ITextEditor {
  constructor(private readonly editor: TextEditable) {
    super();
  }

  getCursorPosition(): Point {
    const selections = this.editor.getSelections();
    if (selections.length > 0) {
      return this.pointFromOffset(selections[0].to);
    } else {
      return new Point(0, 0);
    }
  }

  setCursorPosition(position: Point): void {
    this.setSelectionRange(new Range(position, position));
  }

  setSelectionRange(range: Range): void {
    const from = this.offsetFromPoint(range.start);
    const to = this.offsetFromPoint(range.end);
    this.editor.setSelections([{ from, to }]);
  }

  getLastRow(): number {
    return this.editor.getLineCount() - 1;
  }

  acceptsTableEdit(row: number): boolean {
    const line = this.editor.getLineRange(row);
    const nodeName = this.editor.getNodeName(line.to);
    return !(['FencedCode', 'BlockMath'].includes(nodeName));
  }

  getLine(row: number): string {
    const { from, to } = this.editor.getLineRange(row);
    return this.editor.getText({ from, to });
  }

  insertLine(row: number, line: string): void {
    // When row is greater than the last, there's no empty new line at the end
    const isAtEnd = row > this.getLastRow();
    const replacement = isAtEnd ? this.lineBreak + line : line + this.lineBreak;
    const offset = isAtEnd ? this.editor.getText().length : this.editor.getLineRange(row).from;
    this.editor.setText(replacement, { from: offset, to: offset });
  }

  deleteLine(row: number): void {
    const { from, to } = this.editor.getLineRange(row);
    const eol = row === this.getLastRow() ? 0 : 1; // getLineRange already takes line endings into account
    this.editor.setText('', { from, to: to + eol });
  }

  replaceLines(startRow: number, endRow: number, lines: string[]): void {
    const from = this.editor.getLineRange(startRow).from;
    const to = this.editor.getLineRange(endRow - 1).to;
    this.editor.setText(lines.join(this.lineBreak), { from, to });
  }

  transact(func: () => void): void {
    func();
  }

  // MARK: - Private

  private get lineBreak(): string {
    return this.editor.getLineBreak();
  }

  private pointFromOffset(offset: number): Point {
    const row = this.editor.getLineNumber(offset);
    const column = offset - this.editor.getLineRange(row).from;
    return new Point(row, column);
  }

  private offsetFromPoint(point: Point): number {
    const line = this.editor.getLineRange(point.row);
    return line.from + point.column;
  }
}
