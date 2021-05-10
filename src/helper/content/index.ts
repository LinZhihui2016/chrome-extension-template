import { Component } from "@vue/runtime-core";
import { App, createApp } from "vue";
import { clientKey } from "@/util/symbol";
import { Client } from "@/message";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

let isInit = false;
export const contentInit = (
  APP: Component,
  cb?: (app: App<Element>) => void
) => {
  if (isInit) return console.log("is init");
  isInit = true;
  const appEl = document.createElement("div");
  appEl.id = "appExtensionContainer";
  document.querySelector("body")?.appendChild(appEl);
  const app = createApp(APP);
  cb && cb(app);
  app.provide(clientKey, Client.content);
  app.use(ElementPlus);
  app.mount("#appExtensionContainer");
  return app;
};
