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
