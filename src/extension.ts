import * as vscode from "vscode";

import printExt from "./exts/print";
import printAllCommentExt from "./exts/printAllComment";
import printAllUncommentExt from "./exts/printAllUncomment";
import printAllRemoveExt from "./exts/printAllRemove";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(printExt);
  context.subscriptions.push(printAllCommentExt);
  context.subscriptions.push(printAllUncommentExt);
  context.subscriptions.push(printAllRemoveExt);
}

export function deactivate() {}
