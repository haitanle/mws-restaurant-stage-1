self.addEventListener('install', function(event){
 console.log('test');
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
  console.log('fetch cache');
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request);
    })
  );
});