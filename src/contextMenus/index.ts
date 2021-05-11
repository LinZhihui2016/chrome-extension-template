import CreateProperties = chrome.contextMenus.CreateProperties;

export class ContextMenu {
  constructor() {}
  add(opt: CreateProperties) {
    chrome.contextMenus.create(opt);
    return this;
  }
}
