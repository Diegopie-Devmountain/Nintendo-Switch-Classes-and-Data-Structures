import { useRef, useState } from 'react';
import { NintendoSwitch } from "../data/SwitchClass";

export function State() {
  console.log('re render!');

 

  return (
    <section>
      <h1 className='App-Section-Break'>Rerender Child</h1>
      <article className='App_State-Button-Container'>

        {/* Variables */}
        <button className='App-Default-Button'
          onClick={() => {
            
          }}
        >Get A Blue Switch with Variables</button>

        {/* State */}
        <button className='App-Default-Button'
          onClick={() => {
           
          }}
        >Get A Blue Switch State</button>

        {/* Ref */}
        <button className='App-Default-Button'
          onClick={() => {
            
          }}
        >Get A Blue Switch Ref</button>
      </article>
    </section>

  )
}