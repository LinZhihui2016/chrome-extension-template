import { Client, Msg, MsgListener } from "@/message";
import { tabCreate } from "@/helper/background";
import { Omnibox } from "@/omnibox";
import { ContextMenu } from "@/contextMenus";

const thisClient = Client.background;
const fn = ($input: string, from: Client) => {
  console.log("this msg from " + Client[from]);
  const input = "express result: " + $input;
  new Msg({ from: thisClient, to: Client.content, action: "expressData" })
    .send({ input })
    .then((res) => {
      console.log(res);
    });

  return input;
};
new MsgListener(thisClient)
  .addListener(Client.popup, "input", (msg) => fn(msg, Client.popup))
  .addListener(Client.content, "input", (msg) => fn(msg, Client.content))
  .listen();

new ContextMenu().add({
  type: "normal",
  title: "快递查询",
  contexts: ["selection"],
  onclick: (e) => {
    window.alert(e.selectionText);
  },
});

new Omnibox()
  .onChanged((text, suggest) => {
    if (!text) return;
    suggest([{ content: "快递查询" + text, description: `你要查${text}吗？` }]);
  })
  .onEnter((text) => {
    tabCreate("https://www.baidu.com/s?ie=UTF-8&wd=" + text);
  });
