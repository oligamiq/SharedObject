import { a } from "../lib";

console.log("Hello World!");
console.log(a);

const w = new Worker(
  new URL("../src-dist/worker.js", import.meta.url).href,
  { type: "module" }
);

// sleep 1000
await new Promise((resolve) => setTimeout(resolve, 1000));

const bc = new BroadcastChannel("test_channel");

bc.postMessage("Hello from main by BroadcastChannel!");

// sleep 1000
await new Promise((resolve) => setTimeout(resolve, 1000));

w.postMessage("Hello from main!");

// sleep 1000
await new Promise((resolve) => setTimeout(resolve, 1000));

console.log("Main thread woke up!");
bc.postMessage("Hello from main again!");

console.log("Main thread is going to sleep!!");
