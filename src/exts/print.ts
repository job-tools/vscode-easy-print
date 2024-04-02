import * as vscode from "vscode";

export default vscode.commands.registerTextEditorCommand(
  "vscode-easy-print.print",
  function () {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const varSelection = editor.selection;
      const word = document.getText(varSelection);
      const logOption = vscode.workspace.getConfiguration("vscode-easy-print");
      const printSymbol = logOption.PrintSymbol || ":::";
      const quotationMark = logOption.QuotationMark === "single" ? `'` : `"`;
      const logEnd = logOption.ShowLogSemicolon ? ");" : ")";
      const logFn = logOption.PrintMethod || "console.log";
      if (!word) {
        const value = new vscode.SnippetString(
          `${logFn}(${quotationMark}$1${printSymbol} ${quotationMark}, $1${logEnd}`
        );
        editor.insertSnippet(value, varSelection.start);
        return;
      }

      vscode.commands
        .executeCommand("editor.action.insertLineAfter")
        .then(() => {
          const insertSection = editor.selection;

          editor.edit((editBuilder) => {
            const lineStr = logOption.ShowLineTag
              ? "line:" + (insertSection.end.line + 1)
              : "";

            if (lineStr) {
              const isBegin = logOption.LineTagAtBeginOrEnd === "begin";
              if (isBegin) {
                editBuilder.insert(
                  insertSection.start,
                  `${logFn}(${quotationMark + lineStr} ${
                    word + printSymbol
                  } ${quotationMark}, ${word + logEnd}`
                );
              } else {
                editBuilder.insert(
                  insertSection.start,
                  `${logFn}(${
                    quotationMark + word + printSymbol
                  } ${quotationMark}, ${word}, ${
                    quotationMark + lineStr + quotationMark + logEnd
                  }`
                );
              }
            } else {
              editBuilder.insert(
                insertSection.start,
                `${logFn}(${
                  quotationMark + word + printSymbol
                } ${quotationMark}, ${word + logEnd}`
              );
            }
          });
        });
    }
  }
);
