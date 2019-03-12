if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open('restaurants-review-v3').then(function(cache){
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/js/main.js',
        '/restaurant.html',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/js/dbhelper.js',
        '/js/restaurant_info.js'
      ]);
    })
  );
});


self.addEventListener('fetch', function(event){

  var requestUrl = new URL(event.request.url);

  if(requestUrl.origin === location.origin){
    if (requestUrl.pathname === '/'){
      event.respondWith(caches.match('/index.html'));
    }
    if (requestUrl.pathname === '/restaurant.html'){
      console.log('true');
      event.respondWith(caches.match('/restaurant.html'));
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request);
    })
  );
});