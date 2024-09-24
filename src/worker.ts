/// <reference types="@better-typescript-lib/webworker" />

import { SharedObjectRef } from "../lib";

const workerThis: DedicatedWorkerGlobalScope = globalThis as unknown as DedicatedWorkerGlobalScope;

console.log("Hello World from Worker!");

const sharedObjectRef = new SharedObjectRef("abcd");

const proxy = sharedObjectRef.proxy<[{ add(a: number, b: number): Promise<number> }]>();

// console.log(proxy);

// console.log(proxy[0].add);

// console.log(proxy);

const ret2 = await proxy[0].add(1, 2);

console.log(ret2);

const sharedObjectRef2 = new SharedObjectRef("tyu");

const proxy2 = sharedObjectRef2.proxy<(a: number, b: number) => number>();

console.log(await proxy2(6, 9));
