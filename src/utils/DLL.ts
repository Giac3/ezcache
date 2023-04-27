class ListNode {
  public value: string | number | symbol | null
  public next: ListNode | null
  public prev: ListNode | null

  constructor(value: string | number | symbol | null) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

class DLL {
  public head: ListNode
  public tail: ListNode
  public list: { [key: string | number | symbol]: ListNode };
  public size: number

  constructor() {
    this.head = new ListNode(null)
    this.tail = new ListNode(null)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.size = 0
    this.list = {}
  }

  public length() {
    return this.size
  }

  public addToHead(value: string | number | symbol) {
    let node = new ListNode(value)
    let temp = this.head.next
    temp.prev = node
    this.head.next = node
    node.next = temp
    node.prev = this.head
    this.list[value] = node
    this.size++

  }

  public addToTail(value: string | number | symbol) {
    let node = new ListNode(value)
    let temp = this.tail.prev
    temp.next = node
    this.tail.prev = node
    node.next = this.tail
    node.prev = temp
    this.list[value] = node
    this.size++
  }

  public removeFromHead(): string | number | symbol | null {
    if (this.size === 0) {
      return null
    }
    let node = this.head.next
    node.next.prev = this.head
    this.head.next = node.next
    node.next = null
    node.prev = null
    delete this.list[node.value]
    this.size--
    return node.value
  }

  public remove(value: string | number | symbol): string | number | symbol {
    if (this.list.hasOwnProperty(value)) {
      let node = this.list[value]
      let prev = node.prev
      prev.next = node.next
      node.next.prev = prev
      node.next = null
      node.prev = null
      delete this.list[node.value]
      this.size--
      return node.value
    }
  }

  public removeFromTail(): string | number | symbol | null {
    if (this.size === 0) {
      return null
    }
    let node = this.tail.prev
    node.prev.next = this.tail
    this.tail.prev = node.prev
    node.next = null
    node.prev = null
    delete this.list[node.value]
    this.size--
    return node.value
  }

  public update(value: string | number | symbol) {
    this.remove(value)
    this.addToHead(value)
  }

}

export { DLL, ListNode }
