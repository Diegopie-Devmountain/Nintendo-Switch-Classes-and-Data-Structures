# Classes

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
  
## Create Front End

### Create a class when selecting a color

- Where are we going to store it? Intro useRef
- Set State for What WILL update on render
  
### Disable Buttons onClick

- useRef to create a reference to button container
- useEffect to listen to any interaction to createSwitch function

### Sell Switch Button

- reset ref and classes


## Intro App

State is a child of of App. App has a standard text input that we should be familiar with

## Create A Switch Class In State

- Try setting class in a variable using the button
- Q) What happens if we type in the form?
- A) This child is re-rendered, so our variable is re-initialized in memory

- Try Setting class in state
  
```JS
setNewSwitchState(new NintendoSwitch('red', ['Zelda']));

console.log(newSwitchState); //undefined
```

- Q) Why Undefined?
- A) React has not yet updated the value of our state. We cannot access our updated state within this call back is it is now set until the callback is completed

- Q) How do we fix this? 
- A) Use the callback available to useState

```JS
setNewSwitchState(prevState => {
    prevState = new NintendoSwitch('Blue', ['Smash Bros'])
    console.log(prevState);
    return prevState;
});
```

- Q) What happens if we type in the form?
- A) This child is re-rendered, so our state is set to it's initial value

- Now let's use useRef
