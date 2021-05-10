export enum Client {
  popup,
  content,
  background,
}

export interface MsgOpt {
  to: Client;
  from: Client;
  action: string;
}

export class Msg<Data = any> {
  private readonly action: string;

  constructor(private readonly option: MsgOpt) {
    this.action = this.option.action;
  }

  send(data: Data) {
    switch (this.option.to) {
      case Client.background:
        return this.toBg(data);
      case Client.content:
        return this.toContent(data);
      case Client.popup:
        return this.toPopup(data);
    }
  }

  private toBg(data: Data) {
    const msg = { ...this.option, data };
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(msg, (res) => {
        resolve(res);
      });
    });
  }

  private toPopup(data: Data) {
    return this.toBg(data);
  }

  private toContent(data: Data) {
    const msg = { ...this.option, data };
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tabs[0] &&
          tabs[0].id &&
          chrome.tabs.sendMessage(tabs[0].id, msg, (res) => {
            resolve(res);
          });
      });
    });
  }
}

export class MsgListener {
  constructor(private readonly client: Client) {}
  map = new Map<
    string,
    (msg: any, sender?: chrome.runtime.MessageSender) => any
  >();

  joinKey(from: Client, action: string) {
    return [from, action].join("_");
  }

  addListener(
    from: Client,
    action: string,
    handle: (data: any, sender?: chrome.runtime.MessageSender) => any = (e) => e
  ) {
    const key = this.joinKey(from, action);
    this.map.set(key, handle);
  }
  listen() {
    chrome.runtime.onMessage.addListener(this.fn.bind(this));
  }
  fn(message: any, sender: any, sendResponse: CallableFunction) {
    const { from, to, action, data } = message;
    if (to !== this.client) return sendResponse();
    const key = this.joinKey(from, action);
    const handle = this.map.get(key);
    if (!handle) return sendResponse();
    return sendResponse(handle(data, sender));
  }
  removeListener(from: Client, action: string) {
    const key = this.joinKey(from, action);
    this.map.delete(key);
  }
  clear() {
    this.map.clear();
    chrome.runtime.onMessage.removeListener(this.fn.bind(this));
  }
}
