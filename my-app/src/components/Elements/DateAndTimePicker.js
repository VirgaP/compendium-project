import React, {useState} from 'react'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime"
import moment from "moment";
import "moment/locale/lt";
import "moment/locale/en-gb";

const DateAndTimePicker =(props)=>{
  const[startDate, setStartDate] = useState(props.startDate)
  var yesterday = moment(props.minDate).subtract( 1, 'day' );
  
  var valid = function( current ){
      return current.isAfter( yesterday );
  };

  const handleChange=(date)=> {
    setStartDate(date)
      props.callback(date)
  }
  return (
      <>
        <Datetime
          value={startDate}
          onChange={handleChange}
          timeFormat={true}
          closeOnSelect={true}
          open={props.open}
          inputProps={props.inputProps}
          isValidDate={valid}
        />
      </>
    )
}
export default DateAndTimePicker


