/// <reference types="@types/web" />

import type { Msg } from "./mod";

export class SharedObject<T> {
  kept_object: T;
  room_id: string;
  id: string;

  constructor(object: T, id: string) {
    this.kept_object = object;
    this.room_id = `shared-object-${id}`;
    this.id = "parent";

    this.register();
  }

  call(
    name: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    args: any[]
  ) {
  }

  private register() {
    const bc = new globalThis.BroadcastChannel(this.room_id);

    bc.onmessage = (event) => {
      const data = event.data as Msg;
      if (data.msg === undefined) {
        throw new Error("Invalid message");
      }

      if (this.is_my_msg(data)) {
        return;
      }

      if (data.msg === "func_call::call") {
        this.func_call(bc, data);
      }
    };
  }

  private is_my_msg(msg: Msg) {
    return msg.from === this.id;
  }

  private func_call(bc: globalThis.BroadcastChannel, data: Msg) {
    const { name, args, id } = data as unknown as {
      name: string,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      args: any[],
      id: string,
    };
    try {
      const ret = (this.kept_object as {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        [key: string]: (...args: any[]) => any;
      })[name](...args);

      bc.postMessage({
        msg: "func_call::return",
        ret,
        id,
        from: this.id
      });
    } catch (e) {
      bc.postMessage({
        msg: "func_call::error",
        error: e,
        id,
        from: this.id
      });
    }
  }
}

