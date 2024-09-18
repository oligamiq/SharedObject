/// <reference types="@better-typescript-lib/webworker" />

import { SharedObjectRef } from "../lib/ref";

const workerThis: DedicatedWorkerGlobalScope = globalThis as unknown as DedicatedWorkerGlobalScope;

console.log("Hello World from Worker!");

// 同期xhr
const sharedObjectRef = new SharedObjectRef("test");

// const ret = await sharedObjectRef.call("add", [1, 2]);

// console.log(ret);

// const proxy = sharedObjectRef.proxy<[{ add(a: number, b: number): Promise<number> }]>();

// const ret2 = await proxy[0].add(1, 2);

// console.log(ret2);
