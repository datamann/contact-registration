import { Button } from "@hilla/react-components/Button.js";
import { Tooltip } from "@hilla/react-components/Tooltip.js";
import React from 'react'
import './AddContact.css'

function AddContact (props : any) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <Button id="btnAddContact" theme="primary" onClick={() => {props.setTrigger(false)}}>
          <Tooltip slot="tooltip" text="Close form"/>
          Close form
        </Button>
        { props.children }
      </div>
    </div>
  ) : "";
}

export default AddContact
