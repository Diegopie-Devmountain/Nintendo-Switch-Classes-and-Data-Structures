import lodash from "lodash";

export const games = {
  "mario-kart": { name: "Mario Kart", fileSize: 8000 },
  "breath-of-the-wild": { name: "Breath of the Wild", fileSize: 16000 },
  "smash-bros": { name: "Smash Bros", fileSize: 12000 },
  kirby: { name: "Kirby", fileSize: 6000 },
  "lego-star-wars": { name: "Lego Star Wars", fileSize: 1500 },
  undertale: { name: "Undertale", fileSize: 3000 },
  forknife: { name: "Forknife", fileSize: 9000 },
  doom: { name: "Doom", fileSize: 14000 },
};

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Print the items in the list
  printList() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }

  // Find a node containing the given data
  find(data) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (lodash.isEqual(currentNode.data === data)) {
        // Why Lodash?
        // const obj1 = { key: 'value' };
        // const obj2 = { key: 'value' };

        // console.log(obj1 === obj2); // Output: false (different references)
        // console.log(obj1 === obj1); // Output: true (same reference)

        // const obj1 = { key: "value" };
        // const obj2 = { key: "value" };

        // console.log(lodash.isEqual(obj1, obj2)); // Output: true
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  // Append new node with given data to end of list
  append(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      // beginning of list
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode; // update former last node to point to new last node
      newNode.previous = this.tail; // update new last node to point to the former last node
      this.tail = newNode; // update the tail to point to the new last node
    }
    this.length++;

    return newNode;
  }

  // Remove the node with the given valueToRemove
  remove(valueToRemove) {
    if (!this.head) return; // Empty list

    let nodeToRemove = null; // use to return removed node (like .slice returns removed items)

    if (lodash.isEqual(this.head.data, valueToRemove)) {
      // if head is valueToRemove

      nodeToRemove = this.head;
      this.head = this.head.next; // update head to be former second node in list
      if (this.head === null) {
        // If former second item in list is null, the head was the only item and we now have any empty list
        this.tail = null;
      } else {
        // if we do not have any empty list now
        this.head.prev = null; // the former second item is now the first, thus should not have a prev
      }

      this.length--;
      return nodeToRemove;
    }

    let currentNode = this.head;

    while (currentNode.next !== null) {
      // the last item in the list will have a next prop of null
      if (lodash.isEqual(currentNode.next.data, valueToRemove)) {
        // We want to interact with the node before the one we want to remove (since we have a doubly linked list we don't have to)
        nodeToRemove = currentNode.next;
        const newNeighborNode = currentNode.next.next; // store what will now be the new neighboring node
        currentNode.next = newNeighborNode; // update the current node with a new .next value, thus removing the reference to the old neighbor

        if (currentNode.next === null) {
          // If the value we removed was the last item in the list
          this.tail = currentNode; // Update the tail
          this.length--;
          return;
        }

        newNeighborNode.previous = currentNode; // update new neighbor with a new .previous value, thus removing all reference to the old neighbor (allowing for garbage collector to kick in)
        this.length--;
        return nodeToRemove;
      }

      currentNode = currentNode.next; // Keeping traversing the list until a match is found
    }
    return nodeToRemove;
  }

  // Remove the node at the given index (or you can have it not be a base 0)
  removeByIndex(index) {
    if (index < 0 || index >= this.length) {
      return; // invalid index
    }

    if (index === 0) {
      // if the 1st item is to be removed
      return this.removeByIndex(this.head.data);
    }

    let nodeToRemove = null;
    let currentNode = this.head; // store node we want to remove
    let previousNode = null; // store the previous node (redundant here since we have a doubly linked list)
    let currentIndex = 0;

    while (currentIndex < index) {
      // Loop through list until we reach the specified index
      previousNode = currentNode; // store reference to the previous node (again, redundant in a doubly linked list)
      currentNode = currentNode.next; // update current node to be the next node in the list
      currentIndex++;
    }

    nodeToRemove = currentNode; // now that we've reached the specified index, currentNode is the node we want to remove

    previousNode.next = nodeToRemove.next; // update the previous nodes' .next property to be the new neighbor
    if (previousNode.next === null) {
      // if the previous node .next is now null, we are at the end of the list and need to update the tail
      this.tail = previousNode;
      this.length--;
      return nodeToRemove;
    }

    nodeToRemove.next.previous = previousNode; // use the old neighbor to update the newNeighbor's previous value to be the previous node
    this.length--;
    return nodeToRemove;
  }

  // Insert a new node at the given index
  insertAt(index, data) {
    if (index < 0 || index > this.length) {
      return; // invalid index
    }

    const newNode = new Node(data);

    if (index === 0) {
      // if we want to replace the head
      newNode.next = this.head; // set the next value on the new first node to be the former first node
      this.head = newNode; // update the head
      if (this.tail === null) {
        // if the list was empty, this is the only time, thus is also the tail
        this.tail = newNode;
      }
      this.length++;
      return newNode;
    }

    let currentNode = this.head;
    let previousNode = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }

    newNode.next = currentNode; // the new node is going to slot in between the previous and current nodes
    previousNode.next = newNode;

    if (newNode.next === null) {
      // if the new node is now the last item in the list
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    currentNode.previous = newNode; // if we reach here, the new node is not the last item so we need to update the current node .previous to point to our new node
    this.length++;

    return newNode;
  }

  // create array
  toArray() {
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }
    return array;
  }

  toObject() {
    const obj = {};
    let currentNode = this.head;
    let key = 0;
    while (currentNode !== null) {
      // const key = currentNode.data.name.toLowerCase().replace(/\s+/g, '-');
      obj[0] = currentNode.data;
      currentNode = currentNode.next;
      key++;
    }
    return obj;
  }

  updateData(oldData, newData) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (lodash.isEqual(currentNode.data, oldData)) {
        currentNode.data = newData;
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  // Clear the list
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Check if the list is empty
  isEmpty() {
    return this.length === 0;
  }

  // Get the size of the list
  size() {
    return this.length;
  }
}

export class DownloadQueue {
  constructor() {
    this._data = [];
  }

  enqueue(value) {
    this._data.push(value);
  }

  dequeue() {
    return this._data.shift();
  }

  peek() {
    return this._data[0];
  }

  isEmpty() {
    return this._data.length === 0;
  }
}
