interface CacheEntry {
  key: string | number | symbol;
  value: any;
  frequency: number;
}

class LFUCache {
  private cache: Map<string | number | symbol, CacheEntry>;
  private frequencyMap: { [key: string | number | symbol]: number };
  private capacity: number;

  constructor(capacity: number) {
    this.cache = new Map<string | number | symbol, CacheEntry>();
    this.frequencyMap = {};
    this.capacity = capacity;
  }

  public get(key: string | number | symbol): any {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }
    this.incrementFrequency(entry);
    return entry.value;
  }

  public isCached(key: string | number | symbol): boolean {
    return this.cache.has(key);
  }

  public invalidateAll(): void {
    this.cache.clear();
    this.frequencyMap = {};
  }

  public put(key: string | number | symbol, value: any): void {
    if (this.capacity === 0) {
      return;
    }
    const entry = this.cache.get(key);
    if (entry) {
      entry.value = value;
      this.incrementFrequency(entry);
    } else {
      if (this.cache.size >= this.capacity) {
        this.evictLeastFrequentlyUsed();
      }
      this.cache.set(key, { key, value, frequency: 1 });
      this.frequencyMap[key] = 1;
    }
  }

  private incrementFrequency(entry: CacheEntry): void {
    entry.frequency++;
    this.frequencyMap[entry.key] = entry.frequency;
  }

  private evictLeastFrequentlyUsed(): void {
    let leastFrequentlyUsedKey: string | number | symbol = null;
    let leastFrequentlyUsedFrequency = Infinity;
    for (const [key, entry] of this.cache.entries()) {
      if (entry.frequency < leastFrequentlyUsedFrequency) {
        leastFrequentlyUsedKey = key;
        leastFrequentlyUsedFrequency = entry.frequency;
      }
    }
    this.cache.delete(leastFrequentlyUsedKey);
    delete this.frequencyMap[leastFrequentlyUsedKey];
  }
}


export { LFUCache };
