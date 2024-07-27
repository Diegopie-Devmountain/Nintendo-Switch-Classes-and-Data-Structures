import inquirer from "inquirer";
import { NintendoSwitch, NintendoSwitchOLED } from "./SwitchClass.js";
import prompts from "./prompts.js";

let userSwitch = null;

// ref
// https://github.com/Diegopie/CLI-Employee-Management/blob/main/app.js

(function main() {
  inquirer
    .prompt([prompts.buySwitch, prompts.selectColor])
    .then(({ buySwitch, selectColor }) => {
      switch (buySwitch) {
        case "Regular":
          userSwitch = new NintendoSwitch(selectColor, []);
          console.log(`Welcome to Your New ${userSwitch.getColor()} Nintendo Switch!`);
          useOS();
          break;
        case "OLED":
          userSwitch = new NintendoSwitchOLED(selectColor, []);
          console.log(`Welcome to Your New ${userSwitch.getColor()} Nintendo Switch OLED!`);
          useOS();
          break;
        default:
          console.error("An error occurred, please try again");
          main();
      }
    });
})();

function useOS() {
  inquirer.prompt(prompts.os).then(({ osPrompt }) => {
    switch (osPrompt) {
      case "See My Games":
        viewEmployees();
        break;
      case "View Store":
        viewRoles();
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
