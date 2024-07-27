
import prompts from 'prompts'
import { NintendoSwitch } from './SwitchClass.js';

(async function main () {

  const response = await prompts({
    // The type of prompt to display
    type: 'text',
    // name of this prompt to access from prompts key
    name: 'color',
    message: 'What color Switch do you want?',
    format: (value) => value.toLowerCase()
  })

  console.log(response);

  const userSwitch = new NintendoSwitch(response.color, [])
  console.log(userSwitch);

  const { command } = await prompts({
    type: 'text',
    name: 'command',
    message: 'A) Install A Game, B)Charge Battery, or Q)uit?',
    format: (value) => value.toUpperCase(),
  });

  if (command === 'A') {
    const { task } = await prompts({
      type: 'text',
      name: 'task',
      message: 'Enter task',
    });
    taskQueue.enqueue(task);
  } else if (command === 'D') {
    const task = taskQueue.dequeue();
    console.log(`Task done: ${task}`);
  } else if (command === 'Q') {
    console.log('Goodbye!');
    process.exit();
  } else {
    console.log('Invalid command');
  }
  main();

})()