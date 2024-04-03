import React from 'react'
import './AddContact.css'

function AddContact (props : any) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='btn close-btn' onClick={() => {props.setTrigger(false)}}>Close</button> 
        { props.children }
      </div>
    </div>
  ) : "";
}

export default AddContact
