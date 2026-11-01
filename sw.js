const C='frasek-v3';
const CORE=['./','./index.html','./firebase-config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  const ok = e.request.method==='GET' && (u.origin===location.origin || u.host==='www.gstatic.com' || u.host.endsWith('googleapis.com')&&u.host.startsWith('fonts') || u.host==='fonts.gstatic.com');
  if(!ok) return;
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{}); return r; }).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
});
