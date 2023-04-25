import Mutex from "../utils/Mutex.js";

class SingleThreadCache {
    private cache: Map<string | symbol | number, any>;
    private lock: Mutex;
  
    constructor() {
      this.cache = new Map<string | symbol | number, any>();
      this.lock = new Mutex();
    }
  
    public async get(key: string | symbol | number): Promise<any | undefined> {
      await this.lock.acquire();
      const value = this.cache.get(key);
      this.lock.release();
      return value;
    }
  
    public async set(key: string | symbol | number, value: any): Promise<void> {
      await this.lock.acquire();
      this.cache.set(key, value);
      this.lock.release();
    }
  
    public async remove(key: string | symbol | number): Promise<void> {
      await this.lock.acquire();
      this.cache.delete(key);
      this.lock.release();
    }
  
    public async invalidateAll(): Promise<void> {
      await this.lock.acquire();
      this.cache.clear();
      this.lock.release();
    }
    public async isCached(key: string | symbol | number): Promise<boolean> {
        await this.lock.acquire();
        const exists = this.cache.has(key);
        this.lock.release();
        return exists;
    }
    
  }

export { SingleThreadCache };