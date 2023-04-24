

class KeyValueCache {
    cache: Map<symbol | number | string, any>;
    standardExpiration: number;
    timeoutIds: Map<symbol | number | string, NodeJS.Timeout>;
    
    constructor(standardExpiration: number){
        this.cache = new Map();
        this.standardExpiration = standardExpiration;
        this.timeoutIds = new Map();
    }

    set(key: symbol | number | string, value: any, expiration?: number){
        clearTimeout(this.timeoutIds.get(key));
        const timeoutId = setTimeout(() => {
            this.cache.delete(key)
            this.timeoutIds.delete(key);
          }, expiration || this.standardExpiration);
          
          this.cache.set(key, value);
          this.timeoutIds.set(key, timeoutId);
    }

    get(key: symbol | number | string){
        
        return this.cache.get(key)
    }

    delete(key: symbol | number | string){
        clearTimeout(this.timeoutIds.get(key));
        return this.cache.delete(key)
    }

    invalidateAll() {
        this.timeoutIds.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
    
        this.timeoutIds.clear();
    
        this.cache.clear();
    }

    checkCache(key: symbol | number | string){
        return this.cache.has(key)
    }
}

export { KeyValueCache };

