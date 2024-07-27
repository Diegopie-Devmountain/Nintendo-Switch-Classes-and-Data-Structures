import { games, DownloadQueue } from "./utils.js";

export class NintendoSwitch {
  _color = String;
  _gamesInstalled = Array;
  _screenSize = 5.5;
  _storageCapacity = 16;
  _maxBattery = 6;
  _batteryLife = this._maxBattery;
  _downloadSpeed = 200; //mbs
  _storeLibrary = games;
  _downloadQueue = null;

  constructor(color, gamesInstalled) {
    this._color = color;
    this._gamesInstalled = gamesInstalled;
  }

  // Abstraction

  getColor() {
    return this._color;
  }

  getGamesInstalled() {
    return this._gamesInstalled;
  }

  // * Revision 01
  // installGame(newGame) {
  //   this._gamesInstalled.push(newGame);
  //   return `Installed ${newGame}`;
  // }

  installGame(game) {
    if (!this._downloadQueue) {
      this._downloadQueue = new DownloadQueue();
    }

    const storeGameData = this._storeLibrary[game];
    if (!storeGameData) {
      return `${game} not found in store`;
    }

    this._downloadQueue.enqueue(storeGameData);

    return `${storeGameData.name} Queued for Download!"`;
  }

  async downloadGame() {
    // Demo using normal function
    const downloader = () => {
      const { name: gameToDownload, fileSize } = this._downloadQueue.peek();
      console.log(`Downloading ${gameToDownload}`);
      const timeForDownload = (fileSize / this._downloadSpeed) * 100;
      const timeInSec = timeForDownload / 100 + " seconds";
      console.log(`Expected time: ${timeInSec}`);

      return new Promise((resolve) => {
        setTimeout(() => {
          this._gamesInstalled.push(this._downloadQueue.peek());
          this._downloadQueue.dequeue();
          resolve(`Downloaded ${gameToDownload}`);
        }, timeForDownload);
      });
    };

    while (!this._downloadQueue.isEmpty()) {
      console.log(this._downloadQueue._data);
      console.log(await downloader());
    }

    this._downloadQueue = null;
  }

  playGame(game) {
    if (this._batteryLife < 0) {
      return "Your Switch needs to charge!";
    }
    this._batteryLife = this._batteryLife - 2;
    return `Launching ${game}`;
  }

  getBatteryLife() {
    return this._batteryLife;
  }

  chargeSwitch() {
    this._batteryLife = this._maxBattery;
    return "Battery is fully charged!";
  }

  getAllData() {
    return {
      color: this._color,
      gamesInstalled: this._gamesInstalled,
      batteryLife: this._batteryLife,
    };
  }

  getStoreLibrary() {
    return this._storeLibrary;
  }
}

export class NintendoSwitchOLED extends NintendoSwitch {
  _maxBattery = 10;
  _storageCapacity = 64;
  _screenSize = 7;
  _batteryLife = this._maxBattery;

  constructor(color, gamesInstalled) {
    super(color, gamesInstalled);
  }

  connectToEthernet() {
    this._downloadSpeed = 500;
    return "Data is 500 Mbps download!";
  }
}

const myswitch = new NintendoSwitch("Green", []);

// console.log(myswitch.getStoreLibrary());
// console.log(myswitch.installGame("kirby"));
// console.log(myswitch.downloadGame());
// console.log(myswitch.installGame("undertale"));
// console.log(myswitch.installGame("doom"));
// console.log(myswitch.installGame("lego-star-wars"));
