/// <reference types="@types/serviceworker" />

const workerThis: ServiceWorkerGlobalScope = globalThis as unknown as ServiceWorkerGlobalScope;

workerThis.onmessage = (event) => {
}
