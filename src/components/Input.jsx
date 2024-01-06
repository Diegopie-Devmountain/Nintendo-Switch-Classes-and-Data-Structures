import {useState} from 'react'


export default function Input() {

  const [updateParentState, setUpdateParentState] = useState('')

  return (
    <section>
      <label htmlFor='updateState'>Updating Sibling State</label>
      <input name='updateState' id='updateState' value={updateParentState} onChange={e => setUpdateParentState(e.target.value)} />
    </section>
  )
}