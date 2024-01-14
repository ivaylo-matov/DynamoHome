export function openFile(path) {
    if (chrome.webview !== undefined) {
      chrome.webview.hostObjects.scriptObject.OpenFile(path);
    }
};