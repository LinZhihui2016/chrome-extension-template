export const getCurrentTabId = () =>
  new Promise<number>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.length ? resolve(tabs[0].id!) : reject();
    });
  });

export const tabCreate = (url: string) => chrome.tabs.create({ url });
export const tabUpdate = (url: string) =>
  getCurrentTabId()
    .then((id) => chrome.tabs.update(id, { url }))
    .catch(() => {});
