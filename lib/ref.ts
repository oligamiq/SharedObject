import type { Msg } from "./mod";

export class SharedObjectRef {
  private room_id: string
  private id: string;
  private map: Map<string, (value?: unknown) => void> = new Map();
  private sync_handle: Promise<void>;
  private bc: BroadcastChannel;

  constructor(id: string) {
    this.room_id = `shared-object-${id}`;

    this.id = id;
    this.bc = new globalThis.BroadcastChannel(this.room_id);
    this.register();

    this.sync_handle = this.sync();
  }

  private is_my_msg(msg: Msg) {
    return msg.from === this.id;
  }

  async_proxy<T>() {
    return new Proxy({}, {
      get: (_, prop) => {
        console.log("props:", prop);

        const handle = async 
      }
    }) as T;
  }

  private register() {
    const bc = this.bc;

    bc.onmessage = (event) => {
      const data = event.data as Msg;

      if (data.msg === undefined) {
        throw new Error("Invalid message");
      }

      if (this.is_my_msg(data)) {
        return;
      }

      if (data.msg.startsWith("func_call::")) {
        const resolve = this.map.get(data.id);
        if (resolve !== undefined) {
          resolve(data);
          this.map.delete(data.id);
        } else {
          throw new Error("what happened? unreachable code");
        }
      }

      if (data.msg.startsWith("sync::")) {
        const resolve = this.map.get(data.id);
        if (resolve !== undefined) {
          resolve(data);
          this.map.delete(data.id);
        } else {
          throw new Error("what happened? unreachable code");
        }
      }
    }
  }

  private get_id() {
    return Math.random().toString(36).slice(2);
  }

  async sync(): Promise<void> {
    if (this.sync_handle !== undefined) {
      return this.sync_handle;
    }

    const bc = this.bc;

    const { promise, resolve } = Promise.withResolvers();

    const id = this.get_id();

    bc.postMessage({
      msg: "sync::call",
      id,
      from: this.id
    });

    this.map.set(id, resolve);

    const data = await promise as Msg;

    this.check_msg_error(data);

    if (data.msg === "sync::return") {
    }
  }

  private check_msg_error(data: {
    msg: string,
  }) {
    if (data.msg.endsWith("::error")) {
      throw (data as {
        msg: string,
        error: Error
      }).error;
    }
  }

  async call(
    name: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    args: any[]
  ) {
    const bc = new globalThis.BroadcastChannel(this.room_id);

    const { promise, resolve } = Promise.withResolvers();

    const id = this.get_id();

    this.map.set(id, resolve);

    bc.postMessage({
      msg: "func_call::call",
      name,
      args,
      id
    });

    const data = await promise as {
      msg: string,
    }

    this.check_msg_error(data);

    if (data.msg === "func_call::return") {
      return (data as {
        msg: string,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        ret: any
      }).ret;
    }

    throw new Error("what happened? unreachable code");
  }
}
