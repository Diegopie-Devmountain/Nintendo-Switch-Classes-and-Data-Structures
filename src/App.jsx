import { useRef, useState } from 'react';
import './App.css';
// import Switch from './assets/Switch.jsx';
import Switch from './components/Switch/Switch.jsx';
import { State } from './components/State';
import Input from './components/Input';

function App() {

  const [updateParentState, setUpdateParentState] = useState('');

  const parentStateRef = useRef(null);

  return (
    <main className='App-Section-Break text-center'>
      {/* <Input /> */}
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log(parentStateRef.current.value);
        
      }}>

        <label htmlFor='updateState'>Updating Parent State</label>
        <input 
          name='updateState' 
          id='updateState'
          value={updateParentState}
          onChange={e => setUpdateParentState(e.target.value)}
          ref={parentStateRef} 
          />
        <button type='submit'>Search Game</button>
      </form>

      <State/>
   
      {/* <Switch /> */}
      <Switch />
    </main>
  )
}

export default App
 