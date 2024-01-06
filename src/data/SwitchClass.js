export class NintendoSwitch {
  _color = String;
  _gamesInstalled = Array;
  _screenSize = 5.5;
  _storageCapacity = 16;
  _maxBattery = 6;
  _batteryLife = this._maxBattery;


  constructor(color, gamesInstalled) {
    this._color = color;
    this._gamesInstalled = gamesInstalled;
  }

  // Abstraction 

  getGamesInstalled() {
    return this._gamesInstalled;
  }

  installGame(game) {
    this._gamesInstalled.push(game);
    return `Installed ${game}`;
  }

  playGame(game) {
    this._batteryLife = this._batteryLife - 2;
    return `Launching ${game}`
  }

  getBatteryLife() {
    return this._batteryLife;
  }

  chargeSwitch() {
    this._batteryLife = this._maxBattery;
    return 'Battery is fully charged!'
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
    return 'Data is 100 Mbps download!'
  }

}
