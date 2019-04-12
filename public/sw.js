self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('trip').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/styles/main.css',
       '/styles/normalize.css',
       '/bundle.js',
       '/img/star--check.svg',
       '/img/star.svg'
     ]);
   }).catch(function(error) {
    console.log(error);
  })
 );
});
