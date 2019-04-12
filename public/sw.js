self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('trip').then(function(cache) {
     return cache.addAll([
       './',
       './index.html',
       './css/main.css',
       './css/normalize.css',
       './bundle.js',
       './img/star--check.svg',
       './img/star.svg'
     ]);
   }).catch(function(error) {
    console.log(error);
  })
 );
});


// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('trip').then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });
