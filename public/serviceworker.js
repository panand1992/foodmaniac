importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/dist/javascripts/0-bundle.js",
    "revision": "3a47bd61fc4abf8ec1331ee603f9bf63"
  },
  {
    "url": "/dist/javascripts/1-bundle.js",
    "revision": "02afa7335db03ea6af3de48309ddc8b4"
  },
  {
    "url": "/dist/javascripts/2-bundle.js",
    "revision": "a584100de6feb5a1e52e30a39b71264b"
  },
  {
    "url": "/dist/javascripts/3-bundle.js",
    "revision": "71a2f8a9c153a80d09b2dcc0041dbbed"
  },
  {
    "url": "/dist/javascripts/main-bundle.js",
    "revision": "d68e52ddf59800fedac04db0bca927ea"
  },
  {
    "url": "/dist/javascripts/node-static.js",
    "revision": "09e9826c04bfe6d40934b3acb2d5d254"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute(/http:\/\/localhost:3000/, workboxSW.strategies.staleWhileRevalidate({}), 'GET');
workboxSW.router.registerRoute(/http:\/\/foodmaniac.herokuapp.com/, workboxSW.strategies.staleWhileRevalidate({}), 'GET');
workboxSW.router.registerRoute(/https:\/\/foodmaniac.herokuapp.com/, workboxSW.strategies.staleWhileRevalidate({}), 'GET');
workboxSW.router.registerRoute(/https:\/\/maps.googleapis.com\/maps\/api/, workboxSW.strategies.staleWhileRevalidate({}), 'GET');
