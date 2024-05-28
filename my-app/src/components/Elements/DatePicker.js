import React, {useState, useRef, useEffect} from 'react'
import Flatpickr from "react-flatpickr"
import rangePlugin from "flatpickr/dist/plugins/rangePlugin"
import "flatpickr/dist/flatpickr.min.css"
import "flatpickr/dist/themes/light.css"

const DatePicker = (props) => {

    const options = props.options
    ? Object.assign({}, props.options, {
        plugins: [new rangePlugin({ input: "#" + props.fromDateID })]
      })
    : { plugins: [new rangePlugin({ input: "#" + props.fromDateID })] }
    // const[date, setDate] = useState(Math.round((new Date()).setUTCHours(0,0,0,0)))
    const[date, setDate] = useState(new Date())

    const[disabled, setDisabled] = useState(props.disabled ? props.disabled : false)
    const [range, setRange] = useState(options)
    const[placeholder, setPlaceholder] = useState(props.placeholder ? props.placeholder : "")
    const[selectValue, setSelectvalue] =useState(props.selectValue ? props.selectValue : "")
        
    const inputRef = useRef(null);

    const handleDate=({date})=>{
        setDate(date)
        props.isBlocking(true)
        props.callback(date)
    }


    function clearDate() {
        inputRef.current.flatpickr.clear();
    }

    useEffect(() => {
       if(props.resetDate){
           setDate(new Date())
       }
    }, [props.resetDate])

    return (
        <>
        <Flatpickr
            value={date}
            onChange={date => {
            handleDate({ date });
            }}
            className="form-control clickable"
            disabled={disabled}
            ref={inputRef}
            placeholder={placeholder}
            options={options}
            value={selectValue}
        /> 
        </>
    )
}

export default DatePicker
