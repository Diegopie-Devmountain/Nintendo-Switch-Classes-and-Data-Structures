const prompts = {
  buySwitch: {
    type: 'list',
    name: 'buySwitch',
    message: "What would you like to do?",
    choices: [
      'Regular',
      'OLED',
    ]
  },
  selectColor: {
    type: 'list',
    name: 'selectColor',
    message: "What would you like to do?",
    choices: [
      'Red',
      'Green',
      'Yellow',
      'White'
    ]
  },
  os: {
    type: 'list',
    name: 'osPrompt',
    message: "What would you like to do?",
    choices: [
      'See My Games',
      'View Store',
      'Download Games',
      'Shutdown'
    ]
  }
}
;

export default prompts;