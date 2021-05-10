import { Client, MsgListener } from "@/message";
import Content from "@/Content.vue";
import { msgListenerKey } from "@/util/symbol";
import { contentInit } from "@/helper/content";

const thisClient = Client.content;
const msgListener = new MsgListener(thisClient);

msgListener.addListener(Client.background, "expressData", () => {
  contentInit(Content, (app) => {
    app.provide(msgListenerKey, msgListener);
  });
  return "init";
});
msgListener.listen();
