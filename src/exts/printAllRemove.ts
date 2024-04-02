import * as vscode from "vscode";

export default vscode.commands.registerTextEditorCommand(
  "vscode-easy-print.printAllRemove",
  function () {
    const editor = vscode.window.activeTextEditor;
    const document = editor!.document;
    const documentText = document.getText();
    const reg = /console.+?\);*/g;

    const text: any[] = [];
    documentText.split("\n").map((item) => {
      let lineHasConsole = reg.test(item);
      let t = item.replace(reg, "");
      if (!lineHasConsole) {
        text.push(t);
      }
    });

    editor!.edit((editBuilder) => {
      const end = new vscode.Position(
        vscode.window.activeTextEditor!.document.lineCount + 1,
        0
      );
      editBuilder.replace(
        new vscode.Range(new vscode.Position(0, 0), end),
        text.join("\n")
      );
    });
  }
);
