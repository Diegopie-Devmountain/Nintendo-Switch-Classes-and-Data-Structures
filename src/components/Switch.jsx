import { useEffect, useRef, useState } from 'react'
import { NintendoSwitch } from '../data/SwitchClass.js'
import userIcons from "../data/switchImg.js";
// import './App.css'
import { Button, Col, Container, Row } from 'react-bootstrap'

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
    <main className='mt-5'>
      <Container>
        <h1>Select Your Switch</h1>

      </Container>
      <Container>
        <Row>
          <Col>
            <img className='w-50' src='https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/hardware/nintendo-switch-red-blue/110478-nintendo-switch-neon-blue-neon-red-front-screen-on-1200x675' />
          </Col>
          <Col>
            <Row>
              <h3>{selectColor}</h3>
            </Row>
            <Row className='Switch-Icons-Container' ref={selectSwitchContainer}>
              {userIcons.map(image => (
                <button className='Switch-Icon-Button' key={image.id} onClick={(e) => {
                  // Add Border
                  // e.currentTarget.classList.add('Switch-Icon-Selected');
                  const domTarget = e.target
                  domTarget.classList.add('Switch-Icon-Selected')

                  setSelectColor(image.color);

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
            </Row>
            <Row>
              {!userSwitch.current ?
                <Button className='mt-1 w-25' onClick={() => createSwitch(selectColor)}>Get Switch!</Button>
                : null
              }
            </Row>
            <Row>
              {userSwitch.current ?
                <Button className='mt-3 w-25' onClick={() => {
                  userSwitch.current = null;
                  setAllGames([]);
                  setBatteryLife(0);

                  const allButtons = selectSwitchContainer.current.children;
                  Array.from(allButtons).forEach((button => {
                    button.disabled = false;
                  }))
                }} >Sell Switch</Button>
                : null
              }
            </Row>

          </Col>
        </Row>
      </Container>

      {userSwitch.current ?
        <Container className='mt-4'>
          <h2>You have a {userSwitch.current._color} Switch</h2>
          <Container>
            <Row>
              <Col xs='5'>
                <Row>
                  Current Battery Life: {batteryLife}
                </Row>
                <Row>
                  <Button variant="outline-primary" className='w-25 mt-3' onClick={() => {
                    userSwitch.current.chargeSwitch();
                    setBatteryLife(userSwitch.current.getBatteryLife());
                  }}>Charge Switch</Button>
                </Row>
              </Col>
              <Col xs='6'>
                <Row>
                  Play Games:
                </Row>
                <Container>
                  {allGames.length > 0 ?

                    allGames.map((game) => {
                      
                      return (
                        <Row xs='3' key={crypto.randomUUID()}>
                          <Button onClick={() => {

                            alert(`${userSwitch.current.playGame(game)}`)
                            setBatteryLife((prev) => {
                              return prev = userSwitch.current.getBatteryLife();
                            })
                          }}>{game}</Button>
                        </Row>
                      )
                    })

                    : 'Install a Game!'
                  }
                </Container>
              </Col>
            </Row>
          </Container>
          {/* Install Game */}
          <Container className='mt-5'>
            <Row xs='6'>
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
                <Button className='m-2' variant='outline-primary' type='submit'> Install Game</Button>
              </form>
            </Row>
          </Container>
        </Container>
        : null
      }



    </main>
  )
}

export default Switch
