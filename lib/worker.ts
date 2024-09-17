/// <reference types="@better-typescript-lib/webworker" />

const workerThis: DedicatedWorkerGlobalScope = globalThis as unknown as DedicatedWorkerGlobalScope;

workerThis.onmessage = (event) => {
}
