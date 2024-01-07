# Classes, Ref, useEffect

## Make Switch.js file and set up classes

- create Class properties
- Create class constructor
- Create Instances of the switch

- Create Listed methods
- Play with these methods

- Create Super
- Create Super Instance
- Play with it
- Create Super Methods
  
## Intro App

State is a child of of App. App has a standard text input that we should be familiar with

## Create A Switch Class In State.jsx

### Using Variables

- Try setting class in a variable using the button
- Q) What happens if we type in the form?
- A) This child is re-rendered, so our variable is re-initialized in memory

## Using State
  
<!-- ```JS
setNewSwitchState(new NintendoSwitch('red', ['Zelda']));

console.log(newSwitchState); //undefined
``` -->

<!-- - Q) Why Undefined?
- A) React has not yet updated the value of our state. We cannot access our updated state within this call back is it is now set until the callback is completed -->
<!-- 
- Q) How do we fix this?
- A) Use the callback available to useState -->

- Q) What happens if we type in the form?
- A) This works! But we're not really doing anything with it. We don't use it to render the dom, we don't ever want to update its value

### Using useRef

## Using The Switch Component

### Intro Component

### Create a class when selecting a color

- Where are we going to store it? Intro useRef
- Set State for What WILL update on render
  
### Disable Buttons onClick

- useRef to create a reference to button container
- useEffect to listen to any interaction to createSwitch function

### Sell Switch Button

- reset ref and classes

## Local Storage

What if we want to save our information after a refresh, do we really want to create a database just for this?

add getAllData method to return color and games

```JS
  localStorage.setItem('userSwitch', userSwitch.current.getAllData())
```

We can use local storage to save data in this browser.

- Q) How do we see this and what data do we get?
- A) The application tab of dev tool will show local storage



### Prevent Battery from dying

use console logs to understand when your use effect is being used

update getAllData to get battery life, update constructor so that battery is an optional param with a default value of max battery