import { InjectionKey } from "vue";
import { Client, MsgListener } from "@/message";

export const clientKey: InjectionKey<Client> = Symbol();
export const msgListenerKey: InjectionKey<MsgListener> = Symbol();
