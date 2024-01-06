import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Button, Col, Container, FormLabel, Row } from 'react-bootstrap'
import Switch from './components/Switch';
import { State } from './components/State';

function App() {

  const [updateParentState, setUpdateParentState] = useState('')

  return (
    <main>
      <label htmlFor='updateState'>Updating Parent State</label>
      <input name='updateState' id='updateState' value={updateParentState} onChange={e => setUpdateParentState(e.target.value)}/>
      <Switch />
      <State/>
    </main>
  )
}

export default App
 