class KeyValueCache {
    
    private cache: Map<symbol | number | string, any>;
    private standardExpiration: number;
    private timeoutIds: Map<symbol | number | string, NodeJS.Timeout>;
    
    constructor(standardExpiration: number){
        this.cache = new Map();
        this.standardExpiration = standardExpiration;
        this.timeoutIds = new Map();
    }

    public set(key: symbol | number | string, value: any, expiration?: number){
        clearTimeout(this.timeoutIds.get(key));
        const timeoutId = setTimeout(() => {
            this.cache.delete(key)
            this.timeoutIds.delete(key);
          }, expiration || this.standardExpiration);
          
          this.cache.set(key, value);
          this.timeoutIds.set(key, timeoutId);
    }

    public get(key: symbol | number | string){
        
        return this.cache.get(key)
    }

    public delete(key: symbol | number | string){
        clearTimeout(this.timeoutIds.get(key));
        return this.cache.delete(key)
    }

    public invalidateAll() {
        this.timeoutIds.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
    
        this.timeoutIds.clear();
    
        this.cache.clear();
    }

    public isCached(key: symbol | number | string){
        return this.cache.has(key)
    }
}

export { KeyValueCache };

