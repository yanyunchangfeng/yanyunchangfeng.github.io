self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/assets/js/simple-jekyll-search.min.js',
            '/assets/img/swipe.svg',
            '/assets/icons/filing.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
            // cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          return caches.match('/assets/icons/cf.png');
        });
      }
    }));
  });

  // 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
      Promise.all([

          // 更新客户端
          self.clients.claim(),

          // 清理旧版本
          caches.keys().then(function (cacheList) {
              return Promise.all(
                  cacheList.map(function (cacheName) {
                      if (cacheName !== 'v1') {
                          return caches.delete(cacheName);
                      }
                  })
              );
          })
      ])
  );
});
