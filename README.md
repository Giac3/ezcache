# Velo-Cache

A simple caching library for JavaScript and TypeScript that provides a variety of different in memory caches. More caches will continue to be added in the future.

## Get Started
Install:
```
npm i velo-cache
```
### Key Value Pair Cache Example:

```javascript
import { KeyValueCache } from "velo-cache"

const cache = new KeyValueCache(30000) // Specifying your Standard Expiration for cached items

cache.set("foo", "bar", 10000) // Optionally specify expiration of individual items.

cache.get("foo") // returns "bar" if in cache otherwise returns undefined

cache.delete("foo") // removes the KV pair from the cache and returns the corresponding value

cache.invalidateAll() // invalidates all items in the cache

cache.isCached("foo") // checks existence of a key in the cache and returns a boolean
```
### Least Recently Used (LRU) Cache Example:

```javascript
import { LRUCache } from "velo-cache"

const cache = new LRUCache(10) // Specifying the maximum capacity of your cache

cache.put("foo", "bar") // Add and update items in the cache

cache.get("foo") // Get items from the cache

cache.isCached("you") // Check if an item exists in the cache and returns a boolean

cache.invalidateAll() // invalidates all items in the cache

```
### Single Threaded Cache Example:

```javascript
import { SingleThreadCache } from "velo-cache"

const cache = new SingleThreadCache()

await cache.set('foo', 'bar') // Add and update items in the cache

await cache.get("foo") // Get items from the cache

await cache.remove("foo") // Remove items from the cache

await cache.isCached("you") // Check if an item exists in the cache and returns a boolean

await cache.invalidateAll() // invalidates all items in the cache

```

### Least Frequently Used (LFU) Cache Example:

```javascript
import { LFUCache } from "velo-cache"

const cache = new LFUCache(5) // Specifying the maximum capacity of your cache

cache.put('foo', 'bar') // Add and update items in the cache

cache.get('foo') // Get items from the cache

cache.isCached("you") // Check if an item exists in the cache and returns a boolean

cache.invalidateAll() // invalidates all items in the cache

```
