import { useEffect, useRef, useState } from 'react'
import { NintendoSwitch } from '../../data/SwitchClass.js'
import userIcons from "./data/switchImg.js";
import './Switch.css';

function Switch() {


  // Plz ignore: app will explode with out some place holder
  const userSwitch = {
    current:null
  };
 const selectColor = null;
 const selectSwitchContainer = null;
 const allGames = [];
 const installGameValue = null;
 

  const createSwitch = (color) => {
   
  }



  return (
    <main className='App-Section-Break-Large'>

      <h1 className='text-center'>Select Your Switch</h1>

      <section className='App-Section-Break Switch-SelectSwitch-Container'>
        <article className='Switch-Console-Container'>
          <img className='Switch-Console-Img' src='https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/hardware/nintendo-switch-red-blue/110478-nintendo-switch-neon-blue-neon-red-front-screen-on-1200x675' />
        </article>
        <article>
          <h3>{!selectColor ? 'Select Your Color' : selectColor}</h3>

          <section className='Switch-Color-Container'>
            <article className='Switch-Icons-Container' ref={selectSwitchContainer}>
              {userIcons.map(image => (
                <button className='Switch-Icon-Button' key={image.id} onClick={(e) => {
                  // Add Border
             
                }}>
                  <img
                    src={image.imageSrc}
                    alt={image.color}
                    className='Switch-Icon'
                  />
                </button>
              ))}
            </article>
            <article>
              {!userSwitch.current ?
                <button className='App-Default-Button mt-4 text-center' onClick={() => createSwitch(selectColor)}>Get Switch!</button>
                : null
              }
              {userSwitch.current ?
                <button className='App-Default-Button mt-3' onClick={() => {
                  
                }} >Sell Switch</button>
                : null
              }
            </article>
          </section>
        </article>
      </section>

      {userSwitch.current ?
        <section className='App-Section-Break-Large'>
          <h2 className='text-center'>You have a {userSwitch.current._color} Switch</h2>
          <article className='App-Section-Break Switch-Interact-Container'>

            <section>
              <h3>
                Current Battery Life: {batteryLife}
              </h3>
                <button variant="outline-primary" className='App-Default-Button mt-3' onClick={() => {
                 
                }}>Charge Switch</button>
              
            </section>
            <section>
              <h3>Play Games: </h3>

              <article className='Switch-Games-Container'>
                {allGames.length > 0 ?

                  allGames.map((game) => {

                    return (
                        <button  key={crypto.randomUUID()} className='Switch-PlayGame-Button' onClick={() => {
                          
                        }}>{game}</button>
                    )
                  })

                  : 'Install a Game!'
                }
              </article>
            </section>
          </article>
          {/* Install Game */}
          <article className='mt-5 mb-5 text-center'>

            <form type='submit' onSubmit={(e) => {

            }}>
              <label htmlFor='installGameValue'>Install A Game</label>
              <input type='text' name='installGameValue' ref={installGameValue} />
              <button className='App-Default-Button m-2' variant='outline-primary' type='submit'> Install Game</button>
            </form>
          </article>
        </section>
        : null
      }
    </main>
  )
}

export default Switch;
