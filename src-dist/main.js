import{a}from"../lib";console.log("Hello World!");console.log(a);const w=new Worker(new URL("../src-dist/worker.js",import.meta.url).href,{type:"module"});await new Promise(resolve=>setTimeout(resolve,5e3));const req=await fetch("https://ppng.io/abvd",{method:"POST",body:JSON.stringify({foo:42})});w.postMessage("Hello from main thread!");
//# sourceMappingURL=main.js.map