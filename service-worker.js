const CACHE="newphoria26-shell-v5";
const CORE=["./","./index.html","./manifest.webmanifest","./assets/icon-192.png","./assets/icon-512.png","./assets/apple-touch-icon.png","./assets/newphoria-logo.png","./data/duotangs.js","./data/el_assignments.js","./data/oi_assignments.js"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).catch(()=>{}));self.skipWaiting();});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();if(new URL(event.request.url).origin===location.origin)caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});return response;}).catch(()=>caches.match(event.request).then(r=>r||caches.match("./index.html"))));});
