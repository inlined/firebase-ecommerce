import Memcached from 'memcached';

export interface Cache {
    getString(key: string): Promise<string | undefined>;
    setString(key: string, value: string): Promise<void>;
    invalidate(key: string): Promise<void>;
    purge(): Promise<void>
}

/**
 * Use this if you are deploying to production and may use more than one machine but
 * do not want to use Memcache. Using "MemoryCache" will cause you to have cache
 * mismatches across machines otherwise
 */
class NoopCache implements Cache {
    getString() {
        return Promise.resolve(undefined);
    }

    setString() {
        return Promise.resolve();
    }

    invalidate() {
        return Promise.resolve();
    }

    purge() {
        return Promise.resolve();
    }
}

/**
 * Use this if you want to test locally but not install memecachd locally.
 */
class InMemCache implements Cache {
    private cache: Record<string, string> = {};

    getString(key: string): Promise<string | undefined> {
        return Promise.resolve(this.cache[key]);
    }
        
    setString(key: string, value: string): Promise<void> {
        this.cache[key] = value;
        return Promise.resolve();
    }

    invalidate(key: string): Promise<void> {
        delete this.cache[key];
        return Promise.resolve();
    }

    purge(): Promise<void> {
        this.cache = {};
        return Promise.resolve();
    }
}

/**
 * Use to speed up production.
 * By default memcache is served on 127.0.0.1:11211, so this
 * is a sane default for apphosting.emulator.yaml
 */
class MemcacheCache implements Cache {
    private readonly cache: Memcached;
    
    constructor(address: string) {
        this.cache = new Memcached(address);
    }

    getString(key: string): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            console.debug("Getting memcache key", key);
            this.cache.get(key, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.debug(`Memcache ${key} = ${data}`);
                resolve(data === undefined ? undefined : data.toString());
            });
        });
    }

    setString(key: string, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.debug(`Setting memcache ${key} = ${value}`);
            this.cache.set(key, value, 3600, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    invalidate(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.cache.del(key, (err) => {
                if (err) {
                    console.error("Failed to invalidate", key);
                    reject(err);
                    return;
                }
                console.error("Invalidated key", key);
                resolve();
            });
        });
    }

    purge(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.cache.flush((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        })
    }
}

let cache: Cache | undefined;
export function getCache(): Cache {
    if (!cache) {
        if (!process.env.MEMCACHE_ADDR) {
            console.debug("MEMCACHE_ADDR not set. Using noop cache");
            cache = new NoopCache();
        } else if (process.env.MEMCACHE_ADDR === "memory") {
            console.debug("MEMCACHE_ADDR is 'memory'. Using InMemCache");
            cache = new InMemCache();
        } else {
            console.debug("MEMCACHE_ADDR is set. Using MemcacheCache");
            cache = new MemcacheCache(process.env.MEMCACHE_ADDR);
        }
    }
    return cache;
}