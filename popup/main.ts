import { createApp } from "vue";
import "@/style/common.scss";
import { Client } from "@/message";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { clientKey } from "@/util/symbol";
import Popup from "@/Popup.vue";

const app = createApp(Popup);
app.provide(clientKey, Client.popup);
app.use(ElementPlus);
app.mount("#appExtensionContainer");
