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
    "revision": "0711b419b113f7b5901c974be6023f8e"
  },
  {
    "url": "/dist/javascripts/1-bundle.js",
    "revision": "892b3e235ce50b7c10e489faf167d1ee"
  },
  {
    "url": "/dist/javascripts/2-bundle.js",
    "revision": "916aaacaa604e78074c4d8e4ab28a633"
  },
  {
    "url": "/dist/javascripts/3-bundle.js",
    "revision": "9fcc52f2bc998afe3045d3607b3cac6a"
  },
  {
    "url": "/dist/javascripts/main-bundle.js",
    "revision": "121d2a2e718e1c8990b58527ee36e8b7"
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
