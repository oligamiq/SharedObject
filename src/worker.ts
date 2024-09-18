/// <reference types="@better-typescript-lib/webworker" />

const workerThis: DedicatedWorkerGlobalScope = globalThis as unknown as DedicatedWorkerGlobalScope;

const bc = new BroadcastChannel("test_channel");
bc.onmessage = (event) => {
  console.log("BroadcastChannel: ");
  console.log(event.data);
}

workerThis.onmessage = (event) => {
  console.log(event.data);
  workerThis.postMessage("Hello from worker!");

  const memory = new WebAssembly.Memory({ initial: 1, maximum: 1, shared: true });
  const buffer = memory.buffer;
  const view = new Int32Array(buffer);

  console.log("worker thread is going to sleep!!");

  (async () => {
    console.log("worker thread is sleeping...");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("worker thread woke up!");

    Atomics.store(view, 0, 66);
    Atomics.notify(view, 0, 1);
  })();

  Atomics.store(view, 0, 42);
  while (true) {
    if (Atomics.wait(view, 0, 42, 1000) === "timed-out") {
      console.log("Worker thread is still sleeping...");
    } else {
      break;
    }
  }

  console.log("Main thread woke up!");
}
