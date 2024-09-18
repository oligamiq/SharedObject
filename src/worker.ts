/// <reference types="@better-typescript-lib/webworker" />

import { SharedObjectRef } from "../lib/ref";

const workerThis: DedicatedWorkerGlobalScope = globalThis as unknown as DedicatedWorkerGlobalScope;

console.log("Hello World from Worker!");

const sharedObjectRef = new SharedObjectRef("test");

const proxy = sharedObjectRef.proxy<[{ add(a: number, b: number): Promise<number> }]>();

// console.log(proxy);

// console.log(proxy[0].add);

// console.log(proxy);

const ret2 = await proxy[0].add(1, 2);

console.log(ret2);

const ret3 = await proxy[0];
console.log(await ret3.add(1, 2));
