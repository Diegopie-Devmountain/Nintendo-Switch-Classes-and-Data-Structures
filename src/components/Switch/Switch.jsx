import { useEffect, useRef, useState } from 'react'
import { NintendoSwitch } from '../../data/SwitchClass.js'
import userIcons from "./data/switchImg.js";
import './Switch.css';

function Switch() {

  const userSwitch = useRef(null);
  const previousImg = useRef(null);

  const [selectColor, setSelectColor] = useState('');

  const selectSwitchContainer = useRef(null);

  const installGameValue = useRef();

  // Make this after play games fails to load
  const [allGames, setAllGames] = useState([]);
  const [batteryLife, setBatteryLife] = useState(0);


  const createSwitch = (color) => {
    if (color === '') {
      alert('Select A Color');
      return;
    }
    userSwitch.current = new NintendoSwitch(color, []);
    setAllGames(userSwitch.current.getGamesInstalled())
    setBatteryLife(userSwitch.current.getBatteryLife())
  }

  useEffect(() => {
    if (userSwitch.current === null) {
      return;
    }
    const allButtons = selectSwitchContainer.current.children;

    Array.from(allButtons).forEach((button => {
      button.disabled = true;
    }))

  }, [createSwitch])


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
                  // e.currentTarget.classList.add('Switch-Icon-Selected');
                  const domTarget = e.target
                  domTarget.classList.add('Switch-Icon-Selected')

                  setSelectColor(image.color);
                  var cssRoot = document.querySelector(':root');

                  cssRoot.style.setProperty('--switch-color', image.color.toLocaleLowerCase());
            
                  // * Set Class Data

                  // Removing Border:
                  if (!previousImg.current) {
                    previousImg.current = domTarget;
                    return
                  }

                  previousImg.current.classList.remove('Switch-Icon-Selected');

                  previousImg.current = e.target;
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
                  userSwitch.current = null;
                  setAllGames([]);
                  setBatteryLife(0);

                  const allButtons = selectSwitchContainer.current.children;
                  Array.from(allButtons).forEach((button => {
                    button.disabled = false;
                  }))
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
                  userSwitch.current.chargeSwitch();
                  setBatteryLife(userSwitch.current.getBatteryLife());
                }}>Charge Switch</button>
              
            </section>
            <section>
              <h3>Play Games: </h3>

              <article className='Switch-Games-Container'>
                {allGames.length > 0 ?

                  allGames.map((game) => {

                    return (
                        <button  key={crypto.randomUUID()} className='Switch-PlayGame-Button' onClick={() => {
                          alert(`${userSwitch.current.playGame(game)}`)
                          setBatteryLife((prev) => {
                            return prev = userSwitch.current.getBatteryLife();
                          })
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

              e.preventDefault();

              if (installGameValue.current.value === '') {
                alert('Must Enter a Game!');
                return;

              } else if (userSwitch.current.getGamesInstalled().includes(installGameValue.current.value)) {

                alert(`You already have ${installGameValue.current.value} installed`)
                return;

              }

              alert(userSwitch.current.installGame(installGameValue.current.value.trim()))

              // * The reference to the array is the same, so react to doesn't detect the change, even it is storing the value. You won't see the changes until you force react to rerender by saving or changing state somewhere else
              // setAllGames(userSwitch.current.getGamesInstalled());
              setAllGames([...userSwitch.current.getGamesInstalled()]);


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
