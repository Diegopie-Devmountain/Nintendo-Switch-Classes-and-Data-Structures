import { useEffect, useRef, useState } from 'react';
import './App.css';
// import Switch from './assets/Switch.jsx';
import Switch from './components/Switch/Switch.jsx';
import { State } from './components/State';
import Input from './components/Input';

function App() {

  const [updateParentState, setUpdateParentState] = useState('')

  return (
    <main className='App-Section-Break text-center'>
      {/* <Input /> */}
      <label htmlFor='updateState'>Updating Parent State</label>
      <input name='updateState' id='updateState' value={updateParentState} onChange={e => setUpdateParentState(e.target.value)}/>

      <State/>
   
      <Switch />
    </main>
  )
}

export default App
 