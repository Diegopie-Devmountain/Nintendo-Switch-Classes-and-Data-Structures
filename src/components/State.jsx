import {useRef, useState} from 'react';
import { NintendoSwitch } from "../data/SwitchClass";

export function State() {
  console.log('re render!');

  // * Create a Class with a Var
  let newSwitch;

  console.log({variable: newSwitch});

  const [newSwitchState, setNewSwitchState] = useState();

  console.log({state: newSwitchState});
  
  const newSwitchRef = useRef()
  
  console.log({ref: newSwitchRef.current});

  return(
    <section>
      <h1>Rerender Child</h1>
      <button
        onClick={() => {
          newSwitch = new NintendoSwitch('blue', ['Mario Kart']);
          console.log(newSwitch);
        }}
      >Get A Blue Switch with Variables</button>

      {/* State */}
      <button
        onClick={() => {
          // Why Undefined?
          // setNewSwitchState(new NintendoSwitch('red', ['Zelda']));

          setNewSwitchState(prevState => {
            prevState = new NintendoSwitch('Blue', ['Smash Bros'])
            console.log(prevState); 
          });

        }}
      >Get A Blue Switch State</button>

      {/* Ref */}
      <button
        onClick={() => {
          newSwitchRef.current = new NintendoSwitch('red', ['Zelda']);
          console.log(newSwitchRef);
        }}
      >Get A Blue Switch Ref</button>
    </section>

  )
}