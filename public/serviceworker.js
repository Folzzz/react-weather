// caching pages
const CACHE_NAME = "version-1";
// assets we wanna cache
const urlsToCache = ['index.html', 'offline.html'];


const self = this;

// install serviceworker
self.addEventListener('install', (event) => {
    // telling browser to wait until our promise is finished or gets rid of the sw
    event.waitUntil(
        // open cache and this will return a promise
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

//listen for requests - to show cache files when we are offline
self.addEventListener('fetch', (event) => {
    console.log('fetching')
    // we first check if the live site is available else we load the offline
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(()=> caches.match('offline.html'))
            })
    )
});

// xctivate the serviceworker - here we clean up any old cache
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    // remove all unwanted caches
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
});