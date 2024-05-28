import React from 'react'
import './Form.scss'

const selectOptions = (props) => {
return(
<>
<div className="select-options-inner-wrapper">
{Object.keys(props.options).slice(1).map((key) => (
    <div className="cursor-p select-input option-input-group" key={props.options[key]}>
        <label className="label-container lower-case" htmlFor={key}><span>{props.options[key]}</span>
            <input
            type="checkbox"
            name={props.name}
            onChange={(e)=>props.callback(e)}
            ref={props.register} 
            id={key}
            value={parseInt(key)}
            defaultChecked={props.formData.includes(key)}
            />
            <span className="checkmark"></span>
      </label>
    </div>
  ))}
      
  </div>

  {props.error &&(
        <div className="error mt-1">please select one of the options</div>
      )}
  </>
  )}
export default selectOptions
