import { SharedObject } from "../lib";
import { SharedObjectRef } from '../lib';

// navigator.serviceWorker.controller?.postMessage("Hello from main.ts");

const object = [{
  add(a: number, b: number) {
    return a + b;
  }
}];

const sharedObject = new SharedObject(object, "abcd");

const sharedObject2 = new SharedObject((a, b) => a * b, "tyu");

const w = new Worker(new URL("../src-dist/worker.js", import.meta.url).href, { type: "module" });
