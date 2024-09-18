import { SharedObject } from "../lib";
import { SharedObjectRef } from '../lib/ref';

// navigator.serviceWorker.controller?.postMessage("Hello from main.ts");

const object = [{
  add(a: number, b: number) {
    return a + b;
  }
}];

const sharedObject = new SharedObject(object, "test");

const w = new Worker(new URL("../src-dist/worker.js", import.meta.url).href, { type: "module" });

const as = (async () => {
  // sleep 1000ms
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Hello World from Main!");
})();

const pro = new Proxy(as, {
  get: (_, prop) => {
    console.log("props:", prop);
  }
});

console.log("pro[0]:", pro[0]);

await as;
