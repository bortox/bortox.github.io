const CACHE_VERSION = 1.17;

const BASE_CACHE_FILES = [
    '/css/main.bundle.min.edef841c223151f1f25365ad6f2251dad4f0ac5b6711d3580f4644cf629476877a33890afa744cc5a53e75edc1f2c3d408f607f5d2f8f77a136210f31bb13fdb.css',
    '/js/main.bundle.min.320e9d18732f8483248bd9a4e34269c64457da85f229f15f954f0334d950f968341a3d1d7d2c65612c4d5bf35d70ea8094be667fca7c7823f135ac6b80fc1ee6.js',
    '/js/appearance.min.badab316c9287a5a42a843e4eb45da65bb3d194a5a0f5fa4a3e516160e67df0b8c65f4f19a8e146436e29d583699e6cb41d6bbe99e05e1dbaa877763bad9f8e2.js',
    '/favicon-32x32.png',
    '/author_hu2cdd244614871961d9817bc58cda12ec_38397_178463ff8af7fe231d93a49825c80690.webp',
    '/sw.js',
    '/'
];

const OFFLINE_CACHE_FILES = [
    '/offline/'
];

const NOT_FOUND_CACHE_FILES = [
    '/404/',
];

const OFFLINE_PAGE = '/offline/';
const NOT_FOUND_PAGE = '/404/';

const CACHE_VERSIONS = {
    assets: 'assets-v' + CACHE_VERSION,
    content: 'content-v' + CACHE_VERSION,
    offline: 'offline-v' + CACHE_VERSION,
    notFound: '404-v' + CACHE_VERSION,
};

// Define MAX_TTL's in SECONDS for specific file extensions
const MAX_TTL = {
    '/': 3600,
    html: 3600,
    json: 86400,
    js: 86400,
    svg: 604800,
    css: 604800,
};

const CACHE_BLACKLIST = [
    (str) => {
        return !str.startsWith('http://localhost') && !str.startsWith('https://bortox.it');
    }
];

const SUPPORTED_METHODS = [
    'GET',
];

/**
 * isBlackListed
 * @param {string} url
 * @returns {boolean}
 */
function isBlacklisted(url) {
    return (CACHE_BLACKLIST.length > 0) ? !CACHE_BLACKLIST.filter((rule) => {
        if(typeof rule === 'function') {
            return !rule(url);
        } else {
            return false;
        }
    }).length : false
}

/**
 * getFileExtension
 * @param {string} url
 * @returns {string}
 */
function getFileExtension(url) {
    let extension = url.split('.').reverse()[0].split('?')[0];
    return (extension.endsWith('/')) ? '/' : extension;
}

/**
 * getTTL
 * @param {string} url
 */
function getTTL(url) {
    if (typeof url === 'string') {
        let extension = getFileExtension(url);
        if (typeof MAX_TTL[extension] === 'number') {
            return MAX_TTL[extension];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/**
 * installServiceWorker
 * @returns {Promise}
 */
function installServiceWorker() {
    return Promise.all(
        [
            caches.open(CACHE_VERSIONS.assets)
                .then(
                    (cache) => {
                        return cache.addAll(BASE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.offline)
                .then(
                    (cache) => {
                        return cache.addAll(OFFLINE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.notFound)
                .then(
                    (cache) => {
                        return cache.addAll(NOT_FOUND_CACHE_FILES);
                    }
                )
        ]
    )
        .then(() => {
            return self.skipWaiting();
        });
}

/**
 * cleanupLegacyCache
 * @returns {Promise}
 */
function cleanupLegacyCache() {

    let currentCaches = Object.keys(CACHE_VERSIONS)
        .map(
            (key) => {
                return CACHE_VERSIONS[key];
            }
        );

    return new Promise(
        (resolve, reject) => {

            caches.keys()
                .then(
                    (keys) => {
                        return legacyKeys = keys.filter(
                            (key) => {
                                return !~currentCaches.indexOf(key);
                            }
                        );
                    }
                )
                .then(
                    (legacy) => {
                        if (legacy.length) {
                            Promise.all(
                                legacy.map(
                                    (legacyKey) => {
                                        return caches.delete(legacyKey)
                                    }
                                )
                            )
                                .then(
                                    () => {
                                        resolve()
                                    }
                                )
                                .catch(
                                    (err) => {
                                        reject(err);
                                    }
                                );
                        } else {
                            resolve();
                        }
                    }
                )
                .catch(
                    () => {
                        reject();
                    }
                );

        }
    );
}

function precacheUrl(url) {
    if(!isBlacklisted(url)) {
        caches.open(CACHE_VERSIONS.content)
            .then((cache) => {
                cache.match(url)
                    .then((response) => {
                        if(!response) {
                            return fetch(url)
                        } else {
                            // already in cache, nothing to do.
                            return null
                        }
                    })
                    .then((response) => {
                        if(response) {
                            return cache.put(url, response.clone());
                        } else {
                            return null;
                        }
                    });
            })
    }
}



self.addEventListener(
    'install', event => {
        event.waitUntil(
            Promise.all([
                installServiceWorker(),
                self.skipWaiting(),
            ])
        );
    }
);

// The activate handler takes care of cleaning up old caches.
self.addEventListener(
    'activate', event => {
        event.waitUntil(
            Promise.all(
                [
                    cleanupLegacyCache(),
                    self.clients.claim(),
                    self.skipWaiting(),
                ]
            )
                .catch(
                    (err) => {
                        event.skipWaiting();
                    }
                )
        );
    }
);

self.addEventListener(
    'fetch', event => {

        event.respondWith(
            caches.open(CACHE_VERSIONS.content)
                .then(
                    (cache) => {

                        return cache.match(event.request)
                            .then(
                                (response) => {

                                    if (response) {

                                        let headers = response.headers.entries();
                                        let date = null;

                                        for (let pair of headers) {
                                            if (pair[0] === 'date') {
                                                date = new Date(pair[1]);
                                            }
                                        }

                                        if (date) {
                                            let age = parseInt((new Date().getTime() - date.getTime()) / 1000);
                                            let ttl = getTTL(event.request.url);

                                            if (ttl && age > ttl) {

                                                return new Promise(
                                                    (resolve) => {

                                                        return fetch(event.request.clone())
                                                            .then(
                                                                (updatedResponse) => {
                                                                    if (updatedResponse) {
                                                                        cache.put(event.request, updatedResponse.clone());
                                                                        resolve(updatedResponse);
                                                                    } else {
                                                                        resolve(response)
                                                                    }
                                                                }
                                                            )
                                                            .catch(
                                                                () => {
                                                                    resolve(response);
                                                                }
                                                            );

                                                    }
                                                )
                                                    .catch(
                                                        (err) => {
                                                            return response;
                                                        }
                                                    );
                                            } else {
                                                return response;
                                            }

                                        } else {
                                            return response;
                                        }

                                    } else {
                                        return null;
                                    }
                                }
                            )
                            .then(
                                (response) => {
                                    if (response) {
                                        return response;
                                    } else {
                                        return fetch(event.request.clone())
                                            .then(
                                                (response) => {

                                                    if(response.status < 400) {
                                                        if (~SUPPORTED_METHODS.indexOf(event.request.method) && !isBlacklisted(event.request.url)) {
                                                            cache.put(event.request, response.clone());
                                                        }
                                                        return response;
                                                    } else {
                                                        return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                                                            return cache.match(NOT_FOUND_PAGE);
                                                        })
                                                    }
                                                }
                                            )
                                            .then((response) => {
                                                if(response) {
                                                    return response;
                                                }
                                            })
                                            .catch(
                                                () => {

                                                    return caches.open(CACHE_VERSIONS.offline)
                                                        .then(
                                                            (offlineCache) => {
                                                                return offlineCache.match(OFFLINE_PAGE)
                                                            }
                                                        )

                                                }
                                            );
                                    }
                                }
                            )
                            .catch(
                                (error) => {
                                    console.error('  Error in fetch handler:', error);
                                    throw error;
                                }
                            );
                    }
                )
        );

    }
);


self.addEventListener('message', (event) => {

    if(
        typeof event.data === 'object' &&
        typeof event.data.action === 'string'
    ) {
        switch(event.data.action) {
            case 'cache' :
                precacheUrl(event.data.url);
                break;
            default :
                console.log('Unknown action: ' + event.data.action);
                break;
        }
    }

});
