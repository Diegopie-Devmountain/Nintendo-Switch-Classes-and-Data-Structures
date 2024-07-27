

## Stacks and Queues

Add the store.js data for games and add a property called storeLibrary

```js
export class NintendoSwitch {
  // ...
  _downloadSpeed = 200; //mbs
  _storeLibrary = games;

  // ...
  getStoreLibrary() {
    return this._storeLibrary
  }
}
```

Now we can create our simple queue

```js
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
```

Now we can refactor installGame method to use a queue

```js
  // ...
  _downloadQueue = null

  // ...
 installGame(game) {
    // Check for active queue and create
    if (!this._downloadQueue) {
      this._downloadQueue = new DownloadQueue()
    }
    // Check for game in store
    const storeGameData = this._storeLibrary[game];
    if (!storeGameData) {
      return `${game} not found in store`;
    }

    // Queue the game for download
    this._downloadQueue.enqueue(storeGameData);

    return `${storeGameData.name} Queued for Download!"`;

  } 

console.log(myswitch.installGame("kirby"));
console.log(myswitch.installGame("undertale"));
console.log(myswitch.installGame("doom"));
```


Now we can create a download method

```js
downloadGame() {
  // Lets just look at our queue first
  console.log(this._downloadQueue._data);
}
```

We want to loop through our queue until each game is downloaded. One way we could do this is with a while loop

```js
downloadGame() {
  // ...

  // But this creates an infinite loop! Be careful with while loops
  // The will always run while the condition is true
  // So make sure your code has a way to change the condition
  while (!this._downloadQueue.isEmpty()) {
    console.log(this.downloadQueue.peek())

    // Dequeueing will eventually make isEmpty() eval to true
    // this._downloadQueue.dequeue();
  }

  this._downloadQueue = null;
}

console.log(myswitch.installGame("kirby"));
console.log(myswitch.downloadGame());
console.log(myswitch.installGame("undertale"));
console.log(myswitch.installGame("doom"));
console.log(myswitch.installGame("lego-star-wars"));
```

This works, but doesn't really emulate downloading a game. Let's mock a promise so we wait for each game to download before the next download starts

```js
async downloadGame() {
    // We can create a function that creates a promise
    function mockAsyncOperation () {
      const gameToDownload = this._downloadQueue.peek()
      console.log(`Downloading ${gameToDownload}`);
      // We have the function return a new Promise()
      // Promise accepts a callback function that has access to a resolve and reject
      // // Reject and be used to show if an error occurs, resolve returns whatever you put in the ()
      return new Promise((resolve) => {
        setTimeout(() => {
          this._downloadQueue.dequeue();
          resolve(`Downloaded ${gameToDownload}`);
        }, 5000 ); 
        
      });
    }

    while (!this._downloadQueue.isEmpty()) {
      console.log(this._downloadQueue._data);
      await mockAsyncOperation();
    }
    
    this._downloadQueue = null;
  }
```

But we get an issue here!
| what do you think is going on? 

Scope, ES5 functions create their own scope

```js

console.log(' global this');
console.log(this);

export class NintendoSwitch {
  async downloadGame() {
    
    console.log('class this');
    console.log(this);

    // In ES5, functions do not automatically capture the this value from their lexical scope. Instead, the value of this is determined when the function is called.
    //  lexical scope essentially means the context around the function
    function mockAsyncOperation () {
      console.log('this');
      console.log(this);
      // ...
    }

    // Arrow functions do capture the lexical scope, so let's switch our callback to do that
  }
}
```

And that's it! Now we can see that even though we called our download method once, it will still download everything we add to the queue. 

Now we can just update our code for downloads to actually work with the file size

```js
const mockAsyncOperation = () => {
  // We can rename keys like this: originalKey: newKey
  const {name: gameToDownload, fileSize} = this._downloadQueue.peek();
  console.log(`Downloading ${gameToDownload}`);
  const timeForDownload = (fileSize / this._downloadSpeed) * 100;
  const timeInSec = (timeForDownload / 100) + ' seconds'
  console.log(`Expected time: ${ timeInSec }`);

  return new Promise((resolve) => {
    setTimeout(() => {
      this._downloadQueue.dequeue();
      resolve(`Downloaded ${gameToDownload}`);
    }, timeForDownload);
  });
}


```