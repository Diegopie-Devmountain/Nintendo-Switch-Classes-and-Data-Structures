export const games = {
  'mario-kart': { name: "Mario Kart", fileSize: 8000 },
  'breath-of-the-wild': { name: "Breath of the Wild", fileSize: 16000 },
  'smash-bros': { name: "Smash Bros", fileSize: 12000 },
  'kirby': { name: "Kirby", fileSize: 6000 },
  'lego-star-wars': { name: "Lego Star Wars", fileSize: 1500 },
  'undertale': { name: "Undertale", fileSize: 3000 },
  'forknife': { name: "Forknife", fileSize: 9000 },
  'doom': { name: "Doom", fileSize: 14000 }
};


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
