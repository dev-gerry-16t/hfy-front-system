/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

if (typeof importScripts === "function") {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  let versionServiceWorker = "v.3.6.12";
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules */
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );
    workbox.routing.registerRoute(
      /\.(?:woff2|ttf|woff|ico)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "fonts",
        plugins: [new workbox.broadcastUpdate.Plugin("api-updates")],
      })
    );

    workbox.routing.registerRoute(
      /\.(?:js|json)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "scripts",
        plugins: [new workbox.broadcastUpdate.Plugin("api-updates")],
      })
    );
    workbox.routing.registerRoute(
      /\.(?:css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "css",
        plugins: [new workbox.broadcastUpdate.Plugin("api-updates")],
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            return caches.delete(key);
          })
        )
      )
      .then(() => {
        console.log("V1 now ready to handle fetches!");
      })
  );
});

addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    skipWaiting().then(() => {
      console.log("version 2.1");
    });
  }
});
