import React, {useState, useRef} from 'react'
import Flatpickr from "react-flatpickr"


const TimePicker = (props) => {
 
    // const[date, setDate] = useState(Math.round((new Date()).setUTCHours(0,0,0,0)))
    const[date, setDate] = useState(new Date())

    const[disabled, setDisabled] = useState(props.disabled ? props.disabled : false)
    const[placeholder, setPlaceholder] = useState(props.placeholder ? props.placeholder : "")
    const[selectValue, setSelectvalue] = useState(props.selectValue ? props.selectValue : "")
    
    const handleDate=({date})=>{
        setDate(date)
        props.callback(date)
    }

    function clearDate() {
        inputTimeRef.current.flatpickr.clear();
    }

    const inputTimeRef = useRef(null);

    return (
        <Flatpickr
            data-enable-time
            onChange={date => {
            handleDate({ date });
            }}
            className="form-control clickable"
            disabled={disabled}
            ref={inputTimeRef}
            placeholder={placeholder}
            options={props.options}
            selected={date}
        />
   
    )
}

export default TimePicker
