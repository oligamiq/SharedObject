/// <reference types="@better-typescript-lib/webworker" />

const workerThis: DedicatedWorkerGlobalScope = globalThis as unknown as DedicatedWorkerGlobalScope;

console.log("Hello World from Worker!");

// 同期xhr
const request = new XMLHttpRequest();
request.open('GET', 'https://ppng.io/abvd', false);
request.send(null);

console.log(request.responseText);
