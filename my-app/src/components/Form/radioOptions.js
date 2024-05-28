import React, {useRef} from 'react'
import './Form.scss'

const radioOptions = ({ callback, props, name, error, options, register, formData}) => {
    const registerProp = props ? props.register : register
    return (
    <>
    {Object.keys(options).map((key) => (
        <div className="cursor-p radio-input option-input-group" key={options[key].id}>
            <label className="label-container" htmlFor={key}><span>{options[key].title}</span><br/><span className="font-m page-type-option-suvbtitle">{options[key].text}</span>
                <input
                type="radio"
                name={name}
                onChange={(e)=>callback(e)}
                id={options[key].id}
                value={parseInt(options[key].id)}
                defaultChecked={formData == options[key].id ? "true" : "false"}
                ref={registerProp({
                    required: true,
                  })}
                />
                <span className="checkmark-radio"></span>
        </label>
        </div>
        
    ))}
      {error && (
        <div className="error mt-1">please select one of the options</div>
      )}
  </>
  )}
export default radioOptions