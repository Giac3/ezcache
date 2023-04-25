class Mutex {
    private isLocked = false;
    private queue: Array<() => void> = [];
  
    public acquire(): Promise<void> {
      return new Promise(resolve => {
        if (!this.isLocked) {
          this.isLocked = true;
          resolve();
          return;
        }
        this.queue.push(resolve);
      });
    }
  
    public release() {
      if (!this.isLocked) {
        throw new Error("Cannot release an unlocked mutex");
      }
      this.isLocked = false;
      const next = this.queue.shift();
      if (next) {
        next();
      }
    }
  }

export default Mutex;