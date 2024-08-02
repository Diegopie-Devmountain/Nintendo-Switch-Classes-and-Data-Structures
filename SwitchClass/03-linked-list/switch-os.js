import inquirer from "inquirer";
import { NintendoSwitch, NintendoSwitchOLED } from "./SwitchClass.js";
import prompts from "./prompts.js";
import { games } from "./utils/games.js";

let userSwitch = null;

// ref
// https://github.com/Diegopie/CLI-Employee-Management/blob/main/app.js

(function main() {
  inquirer
    .prompt([prompts.buySwitch, prompts.selectColor])
    .then(({ buySwitch, selectColor }) => {
      switch (buySwitch) {
        case "Regular":
          userSwitch = new NintendoSwitch(selectColor, [games["mario-kart"]]);
          console.log(
            `Welcome to Your New ${userSwitch.getColor()} Nintendo Switch!`
          );
          useOS();
          break;
        case "OLED":
          userSwitch = new NintendoSwitchOLED(selectColor, [
            games["mario-kart"],
          ]);
          console.log(
            `Welcome to Your New ${userSwitch.getColor()} Nintendo Switch OLED!`
          );
          useOS();
          break;
        default:
          console.error("An error occurred, please try again");
          main();
      }
    });
})();

function useOS() {
  console.log(`Current Battery life: ${userSwitch.getBatteryLife()} hours`);
  inquirer.prompt(prompts.os).then(({ osPrompt }) => {
    switch (osPrompt) {
      case "See My Games":
        viewGames();
        break;
      case "View Store":
        viewStore();
        break;
      case "Download Games":
        viewDep();
        break;
      case "Shutdown":
        process.exit();
      default:
        console.error("An error occurred, please try again");
        useOS();
    }
  });
}

function viewGames() {
  const userGames = userSwitch.getGamesInstalled();

  // maybe here we use a for loop to create an object of keys that store the index and an array to display the names
  const playGameChoices = userGames.map((game) => {
    return game.name;
  });

  // console.log(playGameChoices);
  const playGamePrompt = {
    type: "list",
    name: "playGamePrompt",
    message: "What Game Would You Like To Play?",
    choices: playGameChoices,
  };

  inquirer.prompt(playGamePrompt).then(({ playGamePrompt }) => {
    console.log(userSwitch.playGame(playGamePrompt));
    setTimeout(() => {
      useOS();
    }, 4000);
  });
}

function viewStore() {
  const viewStoreChoices = Object.values(games).map((game) => game.name);
  viewStoreChoices.unshift('Go Back')
  if (viewStoreChoices.length > 10) {
    viewStoreChoices.push('Go Back');
  }

  const viewStorePrompt = {
    type: "list",
    loop: false,
    name: "viewStorePrompt",
    message: "What Game Would You Like To View?",
    choices: viewStoreChoices,
  };

  inquirer.prompt(viewStorePrompt).then( async ({ viewStorePrompt }) => {
    if (viewStorePrompt === 'Go Back') {
      return useOS();
    }
    const gameData = games[viewStorePrompt.toLowerCase().replace(/\s+/g, "-")];
    console.log(gameData);

    const installPrompt = {
      type: "list",
      loop: false,
      name: "installPrompt",
      message: "Would you like to install?",
      choices: ['Install Game!', 'Go Back'],
    };

    const { installPromptResponse } = await inquirer.prompt(installPrompt);

    if (installPromptResponse === 'Install Game!') {
      console.log(userSwitch.installGame(gameData.name));
    } else {
      viewStore()
    }
    
  });
}

// need to setup download, message if download exists, and go back in view games