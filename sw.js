var __wpo = {
  "assets": {
    "main": [
      "/images/ajax-loader.c5cd7.gif",
      "./dist/scripts-340ec.min.js",
      "./dist/styles-70954.min.css",
      "./dist/../",
      "./dist/../images/banner1.jpg",
      "./dist/../images/banner2.jpg",
      "./dist/../images/banner3.jpg",
      "./dist/../images/social.jpg",
      "./dist/../images/about-us.jpg",
      "./dist/../images/projects.jpg",
      "./dist/../images/contact-us.jpg"
    ],
    "additional": [],
    "optional": []
  },
  "externals": [
    "./dist/../images/banner1.jpg",
    "./dist/../images/banner2.jpg",
    "./dist/../images/banner3.jpg",
    "./dist/../images/social.jpg",
    "./dist/../images/about-us.jpg",
    "./dist/../images/projects.jpg",
    "./dist/../images/contact-us.jpg"
  ],
  "hashesMap": {
    "7a1aa43614396382bb15e5fde574d9cdcd21698f": "/images/ajax-loader.c5cd7.gif",
    "1851d980de2c3eb849a79f2d25943baec786cf28": "./dist/scripts-340ec.min.js",
    "e4a8837b1f7351571e017fec61bb35a8ba4eef95": "./dist/styles-70954.min.css",
    "82cfa5d75f5699f3d6e9d9bb0000f9670239b81e": "./dist/../"
  },
  "strategy": "changed",
  "responseStrategy": "cache-first",
  "version": "3/26/2018, 6:44:06 PM",
  "name": "webpack-offline",
  "pluginVersion": "4.8.1",
  "relativePaths": false
};

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/offline-plugin/tpls/empty-entry.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./~/offline-plugin/tpls/empty-entry.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function () {\n  var waitUntil = ExtendableEvent.prototype.waitUntil;\n  var respondWith = FetchEvent.prototype.respondWith;\n  var promisesMap = new WeakMap();\n\n  ExtendableEvent.prototype.waitUntil = function (promise) {\n    var extendableEvent = this;\n    var promises = promisesMap.get(extendableEvent);\n\n    if (promises) {\n      promises.push(Promise.resolve(promise));\n      return;\n    }\n\n    promises = [Promise.resolve(promise)];\n    promisesMap.set(extendableEvent, promises);\n\n    // call original method\n    return waitUntil.call(extendableEvent, Promise.resolve().then(function processPromises() {\n      var len = promises.length;\n\n      // wait for all to settle\n      return Promise.all(promises.map(function (p) {\n        return p[\"catch\"](function () {});\n      })).then(function () {\n        // have new items been added? If so, wait again\n        if (promises.length != len) return processPromises();\n        // we're done!\n        promisesMap[\"delete\"](extendableEvent);\n        // reject if one of the promises rejected\n        return Promise.all(promises);\n      });\n    }));\n  };\n\n  FetchEvent.prototype.respondWith = function (promise) {\n    this.waitUntil(promise);\n    return respondWith.call(this, promise);\n  };\n})();;\n        'use strict';\n\nif (typeof DEBUG === 'undefined') {\n  var DEBUG = false;\n}\n\nfunction WebpackServiceWorker(params, helpers) {\n  var loaders = helpers.loaders;\n  var cacheMaps = helpers.cacheMaps;\n\n  var strategy = params.strategy;\n  var responseStrategy = params.responseStrategy;\n\n  var assets = params.assets;\n  var loadersMap = params.loaders || {};\n\n  var hashesMap = params.hashesMap;\n  var externals = params.externals;\n\n  // Not used yet\n  // const alwaysRevalidate = params.alwaysRevalidate;\n  // const ignoreSearch = params.ignoreSearch;\n  // const preferOnline = params.preferOnline;\n\n  var CACHE_PREFIX = params.name;\n  var CACHE_TAG = params.version;\n  var CACHE_NAME = CACHE_PREFIX + ':' + CACHE_TAG;\n\n  var STORED_DATA_KEY = '__offline_webpack__data';\n\n  mapAssets();\n\n  var allAssets = [].concat(assets.main, assets.additional, assets.optional);\n  var navigateFallbackURL = params.navigateFallbackURL;\n  var navigateFallbackForRedirects = params.navigateFallbackForRedirects;\n\n  self.addEventListener('install', function (event) {\n    console.log('[SW]:', 'Install event');\n\n    var installing = undefined;\n\n    if (strategy === 'changed') {\n      installing = cacheChanged('main');\n    } else {\n      installing = cacheAssets('main');\n    }\n\n    event.waitUntil(installing);\n  });\n\n  self.addEventListener('activate', function (event) {\n    console.log('[SW]:', 'Activate event');\n\n    var activation = cacheAdditional();\n\n    // Delete all assets which name starts with CACHE_PREFIX and\n    // is not current cache (CACHE_NAME)\n    activation = activation.then(storeCacheData);\n    activation = activation.then(deleteObsolete);\n    activation = activation.then(function () {\n      if (self.clients && self.clients.claim) {\n        return self.clients.claim();\n      }\n    });\n\n    event.waitUntil(activation);\n  });\n\n  function cacheAdditional() {\n    if (!assets.additional.length) {\n      return Promise.resolve();\n    }\n\n    if (DEBUG) {\n      console.log('[SW]:', 'Caching additional');\n    }\n\n    var operation = undefined;\n\n    if (strategy === 'changed') {\n      operation = cacheChanged('additional');\n    } else {\n      operation = cacheAssets('additional');\n    }\n\n    // Ignore fail of `additional` cache section\n    return operation['catch'](function (e) {\n      console.error('[SW]:', 'Cache section `additional` failed to load');\n    });\n  }\n\n  function cacheAssets(section) {\n    var batch = assets[section];\n\n    return caches.open(CACHE_NAME).then(function (cache) {\n      return addAllNormalized(cache, batch, {\n        bust: params.version,\n        request: params.prefetchRequest\n      });\n    }).then(function () {\n      logGroup('Cached assets: ' + section, batch);\n    })['catch'](function (e) {\n      console.error(e);\n      throw e;\n    });\n  }\n\n  function cacheChanged(section) {\n    return getLastCache().then(function (args) {\n      if (!args) {\n        return cacheAssets(section);\n      }\n\n      var lastCache = args[0];\n      var lastKeys = args[1];\n      var lastData = args[2];\n\n      var lastMap = lastData.hashmap;\n      var lastVersion = lastData.version;\n\n      if (!lastData.hashmap || lastVersion === params.version) {\n        return cacheAssets(section);\n      }\n\n      var lastHashedAssets = Object.keys(lastMap).map(function (hash) {\n        return lastMap[hash];\n      });\n\n      var lastUrls = lastKeys.map(function (req) {\n        var url = new URL(req.url);\n        url.search = '';\n\n        return url.toString();\n      });\n\n      var sectionAssets = assets[section];\n      var moved = [];\n      var changed = sectionAssets.filter(function (url) {\n        if (lastUrls.indexOf(url) === -1 || lastHashedAssets.indexOf(url) === -1) {\n          return true;\n        }\n\n        return false;\n      });\n\n      Object.keys(hashesMap).forEach(function (hash) {\n        var asset = hashesMap[hash];\n\n        // Return if not in sectionAssets or in changed or moved array\n        if (sectionAssets.indexOf(asset) === -1 || changed.indexOf(asset) !== -1 || moved.indexOf(asset) !== -1) return;\n\n        var lastAsset = lastMap[hash];\n\n        if (lastAsset && lastUrls.indexOf(lastAsset) !== -1) {\n          moved.push([lastAsset, asset]);\n        } else {\n          changed.push(asset);\n        }\n      });\n\n      logGroup('Changed assets: ' + section, changed);\n      logGroup('Moved assets: ' + section, moved);\n\n      var movedResponses = Promise.all(moved.map(function (pair) {\n        return lastCache.match(pair[0]).then(function (response) {\n          return [pair[1], response];\n        });\n      }));\n\n      return caches.open(CACHE_NAME).then(function (cache) {\n        var move = movedResponses.then(function (responses) {\n          return Promise.all(responses.map(function (pair) {\n            return cache.put(pair[0], pair[1]);\n          }));\n        });\n\n        return Promise.all([move, addAllNormalized(cache, changed, {\n          bust: params.version,\n          request: params.prefetchRequest\n        })]);\n      });\n    });\n  }\n\n  function deleteObsolete() {\n    return caches.keys().then(function (keys) {\n      var all = keys.map(function (key) {\n        if (key.indexOf(CACHE_PREFIX) !== 0 || key.indexOf(CACHE_NAME) === 0) return;\n\n        console.log('[SW]:', 'Delete cache:', key);\n        return caches['delete'](key);\n      });\n\n      return Promise.all(all);\n    });\n  }\n\n  function getLastCache() {\n    return caches.keys().then(function (keys) {\n      var index = keys.length;\n      var key = undefined;\n\n      while (index--) {\n        key = keys[index];\n\n        if (key.indexOf(CACHE_PREFIX) === 0) {\n          break;\n        }\n      }\n\n      if (!key) return;\n\n      var cache = undefined;\n\n      return caches.open(key).then(function (_cache) {\n        cache = _cache;\n        return _cache.match(new URL(STORED_DATA_KEY, location).toString());\n      }).then(function (response) {\n        if (!response) return;\n\n        return Promise.all([cache, cache.keys(), response.json()]);\n      });\n    });\n  }\n\n  function storeCacheData() {\n    return caches.open(CACHE_NAME).then(function (cache) {\n      var data = new Response(JSON.stringify({\n        version: params.version,\n        hashmap: hashesMap\n      }));\n\n      return cache.put(new URL(STORED_DATA_KEY, location).toString(), data);\n    });\n  }\n\n  self.addEventListener('fetch', function (event) {\n    var requestUrl = event.request.url;\n    var url = new URL(requestUrl);\n    var urlString = undefined;\n\n    if (externals.indexOf(requestUrl) !== -1) {\n      urlString = requestUrl;\n    } else {\n      url.search = '';\n      urlString = url.toString();\n    }\n\n    // Handle only GET requests\n    var isGET = event.request.method === 'GET';\n    var assetMatches = allAssets.indexOf(urlString) !== -1;\n    var cacheUrl = urlString;\n\n    if (!assetMatches) {\n      var cacheRewrite = matchCacheMap(event.request);\n\n      if (cacheRewrite) {\n        cacheUrl = cacheRewrite;\n        assetMatches = true;\n      }\n    }\n\n    if (!assetMatches && isGET) {\n      // If isn't a cached asset and is a navigation request,\n      // fallback to navigateFallbackURL if available\n      if (navigateFallbackURL && isNavigateRequest(event.request)) {\n        event.respondWith(handleNavigateFallback(fetch(event.request)));\n\n        return;\n      }\n    }\n\n    if (!assetMatches || !isGET) {\n      // Fix for https://twitter.com/wanderview/status/696819243262873600\n      if (url.origin !== location.origin && navigator.userAgent.indexOf('Firefox/44.') !== -1) {\n        event.respondWith(fetch(event.request));\n      }\n\n      return;\n    }\n\n    // Logic of caching / fetching is here\n    // * urlString -- url to match from the CACHE_NAME\n    // * event.request -- original Request to perform fetch() if necessary\n    var resource = undefined;\n\n    if (responseStrategy === 'network-first') {\n      resource = networkFirstResponse(event, urlString, cacheUrl);\n    }\n    // 'cache-first'\n    // (responseStrategy has been validated before)\n    else {\n        resource = cacheFirstResponse(event, urlString, cacheUrl);\n      }\n\n    if (navigateFallbackURL && isNavigateRequest(event.request)) {\n      resource = handleNavigateFallback(resource);\n    }\n\n    event.respondWith(resource);\n  });\n\n  self.addEventListener('message', function (e) {\n    var data = e.data;\n    if (!data) return;\n\n    switch (data.action) {\n      case 'skipWaiting':\n        {\n          if (self.skipWaiting) self.skipWaiting();\n        }break;\n    }\n  });\n\n  function cacheFirstResponse(event, urlString, cacheUrl) {\n    return cachesMatch(cacheUrl, CACHE_NAME).then(function (response) {\n      if (response) {\n        if (DEBUG) {\n          console.log('[SW]:', 'URL [' + cacheUrl + '](' + urlString + ') from cache');\n        }\n\n        return response;\n      }\n\n      // Load and cache known assets\n      var fetching = fetch(event.request).then(function (response) {\n        if (!response.ok) {\n          if (DEBUG) {\n            console.log('[SW]:', 'URL [' + urlString + '] wrong response: [' + response.status + '] ' + response.type);\n          }\n\n          return response;\n        }\n\n        if (DEBUG) {\n          console.log('[SW]:', 'URL [' + urlString + '] from network');\n        }\n\n        if (cacheUrl === urlString) {\n          (function () {\n            var responseClone = response.clone();\n            var storing = caches.open(CACHE_NAME).then(function (cache) {\n              return cache.put(urlString, responseClone);\n            }).then(function () {\n              console.log('[SW]:', 'Cache asset: ' + urlString);\n            });\n\n            event.waitUntil(storing);\n          })();\n        }\n\n        return response;\n      });\n\n      return fetching;\n    });\n  }\n\n  function networkFirstResponse(event, urlString, cacheUrl) {\n    return fetch(event.request).then(function (response) {\n      if (response.ok) {\n        if (DEBUG) {\n          console.log('[SW]:', 'URL [' + urlString + '] from network');\n        }\n\n        return response;\n      }\n\n      // Throw to reach the code in the catch below\n      throw new Error('Response is not ok');\n    })\n    // This needs to be in a catch() and not just in the then() above\n    // cause if your network is down, the fetch() will throw\n    ['catch'](function () {\n      if (DEBUG) {\n        console.log('[SW]:', 'URL [' + urlString + '] from cache if possible');\n      }\n\n      return cachesMatch(cacheUrl, CACHE_NAME);\n    });\n  }\n\n  function handleNavigateFallback(fetching) {\n    return fetching['catch'](function () {}).then(function (response) {\n      var isOk = response && response.ok;\n      var isRedirect = response && response.type === 'opaqueredirect';\n\n      if (isOk || isRedirect && !navigateFallbackForRedirects) {\n        return response;\n      }\n\n      if (DEBUG) {\n        console.log('[SW]:', 'Loading navigation fallback [' + navigateFallbackURL + '] from cache');\n      }\n\n      return cachesMatch(navigateFallbackURL, CACHE_NAME);\n    });\n  }\n\n  function mapAssets() {\n    Object.keys(assets).forEach(function (key) {\n      assets[key] = assets[key].map(function (path) {\n        var url = new URL(path, location);\n\n        if (externals.indexOf(path) === -1) {\n          url.search = '';\n        } else {\n          // Remove hash from possible passed externals\n          url.hash = '';\n        }\n\n        return url.toString();\n      });\n    });\n\n    Object.keys(loadersMap).forEach(function (key) {\n      loadersMap[key] = loadersMap[key].map(function (path) {\n        var url = new URL(path, location);\n\n        if (externals.indexOf(path) === -1) {\n          url.search = '';\n        } else {\n          // Remove hash from possible passed externals\n          url.hash = '';\n        }\n\n        return url.toString();\n      });\n    });\n\n    hashesMap = Object.keys(hashesMap).reduce(function (result, hash) {\n      var url = new URL(hashesMap[hash], location);\n      url.search = '';\n\n      result[hash] = url.toString();\n      return result;\n    }, {});\n\n    externals = externals.map(function (path) {\n      var url = new URL(path, location);\n      url.hash = '';\n\n      return url.toString();\n    });\n  }\n\n  function addAllNormalized(cache, requests, options) {\n    var allowLoaders = options.allowLoaders !== false;\n    var bustValue = options && options.bust;\n    var requestInit = options.request || {\n      credentials: 'omit',\n      mode: 'cors'\n    };\n\n    return Promise.all(requests.map(function (request) {\n      if (bustValue) {\n        request = applyCacheBust(request, bustValue);\n      }\n\n      return fetch(request, requestInit).then(fixRedirectedResponse);\n    })).then(function (responses) {\n      if (responses.some(function (response) {\n        return !response.ok;\n      })) {\n        return Promise.reject(new Error('Wrong response status'));\n      }\n\n      var extracted = [];\n      var addAll = responses.map(function (response, i) {\n        if (allowLoaders) {\n          extracted.push(extractAssetsWithLoaders(requests[i], response));\n        }\n\n        return cache.put(requests[i], response);\n      });\n\n      if (extracted.length) {\n        (function () {\n          var newOptions = copyObject(options);\n          newOptions.allowLoaders = false;\n\n          var waitAll = addAll;\n\n          addAll = Promise.all(extracted).then(function (all) {\n            var extractedRequests = [].concat.apply([], all);\n\n            if (requests.length) {\n              waitAll = waitAll.concat(addAllNormalized(cache, extractedRequests, newOptions));\n            }\n\n            return Promise.all(waitAll);\n          });\n        })();\n      } else {\n        addAll = Promise.all(addAll);\n      }\n\n      return addAll;\n    });\n  }\n\n  function extractAssetsWithLoaders(request, response) {\n    var all = Object.keys(loadersMap).map(function (key) {\n      var loader = loadersMap[key];\n\n      if (loader.indexOf(request) !== -1 && loaders[key]) {\n        return loaders[key](response.clone());\n      }\n    }).filter(function (a) {\n      return !!a;\n    });\n\n    return Promise.all(all).then(function (all) {\n      return [].concat.apply([], all);\n    });\n  }\n\n  function matchCacheMap(request) {\n    var urlString = request.url;\n    var url = new URL(urlString);\n\n    var requestType = undefined;\n\n    if (request.mode === 'navigate') {\n      requestType = 'navigate';\n    } else if (url.origin === location.origin) {\n      requestType = 'same-origin';\n    } else {\n      requestType = 'cross-origin';\n    }\n\n    for (var i = 0; i < cacheMaps.length; i++) {\n      var map = cacheMaps[i];\n\n      if (!map) continue;\n      if (map.requestTypes && map.requestTypes.indexOf(requestType) === -1) {\n        continue;\n      }\n\n      var newString = undefined;\n\n      if (typeof map.match === 'function') {\n        newString = map.match(url, request);\n      } else {\n        newString = urlString.replace(map.match, map.to);\n      }\n\n      if (newString && newString !== urlString) {\n        return newString;\n      }\n    }\n  }\n}\n\nfunction cachesMatch(request, cacheName) {\n  return caches.match(request, {\n    cacheName: cacheName\n  }).then(function (response) {\n    if (isNotRedirectedResponse()) {\n      return response;\n    }\n\n    // Fix already cached redirected responses\n    return fixRedirectedResponse(response).then(function (fixedResponse) {\n      return caches.open(cacheName).then(function (cache) {\n        return cache.put(request, fixedResponse);\n      }).then(function () {\n        return fixedResponse;\n      });\n    });\n  })\n  // Return void if error happened (cache not found)\n  ['catch'](function () {});\n}\n\nfunction applyCacheBust(asset, key) {\n  var hasQuery = asset.indexOf('?') !== -1;\n  return asset + (hasQuery ? '&' : '?') + '__uncache=' + encodeURIComponent(key);\n}\n\nfunction getClientsURLs() {\n  if (!self.clients) {\n    return Promise.resolve([]);\n  }\n\n  return self.clients.matchAll({\n    includeUncontrolled: true\n  }).then(function (clients) {\n    if (!clients.length) return [];\n\n    var result = [];\n\n    clients.forEach(function (client) {\n      var url = new URL(client.url);\n      url.search = '';\n      url.hash = '';\n      var urlString = url.toString();\n\n      if (!result.length || result.indexOf(urlString) === -1) {\n        result.push(urlString);\n      }\n    });\n\n    return result;\n  });\n}\n\nfunction isNavigateRequest(request) {\n  return request.mode === 'navigate' || request.headers.get('Upgrade-Insecure-Requests') || (request.headers.get('Accept') || '').indexOf('text/html') !== -1;\n}\n\nfunction isNotRedirectedResponse(response) {\n  return !response || !response.redirected || !response.ok || response.type === 'opaqueredirect';\n}\n\n// Based on https://github.com/GoogleChrome/sw-precache/pull/241/files#diff-3ee9060dc7a312c6a822cac63a8c630bR85\nfunction fixRedirectedResponse(response) {\n  if (isNotRedirectedResponse(response)) {\n    return Promise.resolve(response);\n  }\n\n  var body = 'body' in response ? Promise.resolve(response.body) : response.blob();\n\n  return body.then(function (data) {\n    return new Response(data, {\n      headers: response.headers,\n      status: response.status\n    });\n  });\n}\n\nfunction copyObject(original) {\n  return Object.keys(original).reduce(function (result, key) {\n    result[key] = original[key];\n    return result;\n  }, {});\n}\n\nfunction logGroup(title, assets) {\n  console.groupCollapsed('[SW]:', title);\n\n  assets.forEach(function (asset) {\n    console.log('Asset:', asset);\n  });\n\n  console.groupEnd();\n}\n        WebpackServiceWorker(__wpo, {\nloaders: {},\ncacheMaps: [],\n});\n        module.exports = __webpack_require__(0)\n      \n\n//////////////////\n// WEBPACK FOOTER\n// ./~/offline-plugin/lib/misc/sw-loader.js?json=%7B%22data_var_name%22%3A%22__wpo%22%2C%22loaders%22%3A%5B%5D%2C%22cacheMaps%22%3A%5B%5D%7D!./~/offline-plugin/tpls/empty-entry.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./~/offline-plugin/tpls/empty-entry.js?./~/offline-plugin/lib/misc/sw-loader.js?json=%257B%2522data_var_name%2522%253A%2522__wpo%2522%252C%2522loaders%2522%253A%255B%255D%252C%2522cacheMaps%2522%253A%255B%255D%257D");

/***/ })
/******/ ]);