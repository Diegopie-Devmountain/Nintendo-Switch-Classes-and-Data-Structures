import {useState} from 'react'


export default function Input() {

  const [updateParentState, setUpdateParentState] = useState('')

  return (
    <section>
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
    </section>
  )
}