import { Client, Msg, MsgListener } from "@/message";

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
const msgListener = new MsgListener(thisClient);
msgListener.addListener(Client.popup, "input", (msg) => fn(msg, Client.popup));
msgListener.addListener(Client.content, "input", (msg) =>
  fn(msg, Client.content)
);
msgListener.listen();
