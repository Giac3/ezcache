import { DLL } from "../index.js";

class LFUCache {
  private listMap: Map<string | number | symbol, DLL>;
  private lfuCount: number;
  private valMap: Map<string | number | symbol, any>;
  private countMap: Map<string | number | symbol, number>
  private capacity: number;

  constructor(capacity: number) {
    this.countMap = new Map()
    this.listMap = new Map()
    this.listMap.set(0, new DLL())
    this.lfuCount = 0
    this.valMap = new Map();
    this.capacity = capacity;
  }

  private counter(key: string | number | symbol) {
    let count = this.countMap.get(key) || 0
    this.countMap.set(key, count + 1)
    this.listMap.get(count).remove(key)
    if (!this.listMap.has(count + 1)) {
      this.listMap.set(count + 1, new DLL())
    }
    this.listMap.get(count + 1).addToHead(key)

    if (count === this.lfuCount && this.listMap.get(count).length() === 0) {
      this.lfuCount++
    }
  }

  public get(key: string | number | symbol): any {
    if (this.valMap.has(key)) {
      this.counter(key)
      return this.valMap.get(key)
    } else {
      return -1
    }
  }

  public set(key: string | number | symbol, value: any): null | void {
    if (this.capacity == 0) {
      return null
    }

    if (!this.valMap.has(key) && this.valMap.size === this.capacity) {
      let removed = this.listMap.get(this.lfuCount).removeFromTail()
      this.valMap.delete(removed)
      this.countMap.delete(removed)
    }
    this.valMap.set(key, value)
    this.counter(key)
    this.lfuCount = Math.min(this.lfuCount, this.countMap.get(key))
  }

  public isCached(key: string | number | symbol): boolean {
    return this.valMap.has(key)
  }

  public invalidateAll(): void {
    this.listMap = new Map()
    this.listMap.set(0, new DLL())
    this.lfuCount = 0
    this.valMap = new Map();
    this.countMap = new Map()
  }

}



export { LFUCache };
