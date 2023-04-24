class LRUNode {

    public key: number | string | symbol | null;
    public value: any;
    public next: LRUNode | null;
    public prev: LRUNode | null;

    constructor(key: number | string | symbol | null, value: any) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }

}

class LRUCache {

    private capacity: number;
    private cache: Map<number | string | symbol, LRUNode>;
    private head: LRUNode;
    private tail: LRUNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.head = new LRUNode(null, null);
        this.tail = new LRUNode(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.cache = new Map();
    }

    public get(key: number | string | symbol): any {
        const node = this.cache.get(key);
        if (!node) {
            return null;
        }
        this.moveToHead(node);
        return node.value;
    }

    public put(key: number | string | symbol, value: any) {
        let node = this.cache.get(key);
        if (!node) {
            node = new LRUNode(key, value);
            this.cache.set(key, node);
            this.addToHead(node);
            if (this.cache.size > this.capacity) {
                const tail = this.removeTail();
                this.cache.delete(tail!.key as string | number | symbol);
            }
        } else {
            node.value = value;
            this.moveToHead(node);
        }
    }

    private addToHead(node: LRUNode) {
        node.next = this.head.next
        node.next!.prev = node
        node.prev = this.head
        this.head.next = node
    }

    private removeNode(node: LRUNode) {
        if (node.prev) {
            node.prev.next = node.next
        }
        if(node.next){
            node.next.prev = node.prev
        }
        node.prev = null
        node.next = null
    }

    private moveToHead(node: LRUNode) {
        this.removeNode(node);
        this.addToHead(node);
    }
    private removeTail() {

        const node = this.tail.prev
        this.removeNode(node!)
        return node

    }

}

export { LRUCache }