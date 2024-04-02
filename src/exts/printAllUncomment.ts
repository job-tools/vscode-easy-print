import * as vscode from "vscode";

export default vscode.commands.registerTextEditorCommand(
  "vscode-easy-print.printAllUncomment",
  function () {
    const editor = vscode.window.activeTextEditor;
    const document = editor!.document;
    const documentText = document.getText();

    editor!.edit((editBuilder) => {
      const end = new vscode.Position(
        vscode.window.activeTextEditor!.document.lineCount + 1,
        0
      );
      editBuilder.replace(
        new vscode.Range(new vscode.Position(0, 0), end),
        documentText.replace(/\/\/\s*console/g, "console")
      );
    });
  }
);
