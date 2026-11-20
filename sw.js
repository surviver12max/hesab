const V='hesab-v1';const FILES=['./','index.html','manifest.json','vazirmatn.woff2','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(e.request,c))}return x}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
