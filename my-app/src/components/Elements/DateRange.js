import React , { useState } from "react";
import DatePicker, {CalendarContainer} from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 

const DateRange = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const TimeInputStart = ({ startDate, value, onChange }) => (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ border: "solid 1px pink" }}
        />
    )

    const TimeInputEnd = ({ endDate, value, onChange }) => (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ border: "solid 1px pink" }}
        />
    )

    const MyContainer = ({ className, children }) => {
        return (
          <div style={{ display:'none' }}>
            <CalendarContainer className={className}>
              <div style={{ background: "#f0f0f0" }}>
                What is your favorite day?
              </div>
              <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
          </div>
        );
      };

    return (
        <>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          showTimeSelect
          dateFormat="yyyy/MM/dd H:mm"
          className="red-border"
          closeOnScroll={e => e.target === document}
          customTimeInput={TimeInputStart}
        />
        {/* <DatePicker 
        showTimeSelect
        customTimeInput={TimeInputStart}
        /> */}
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          showTimeSelect
          customTimeInput={<TimeInputEnd/>}
          dateFormat="yyyy/MM/dd H:mm"
          className="red-border"
          closeOnScroll={e => e.target === document}
        />
        <DatePicker 
        showTimeSelect
        customTimeInput={<TimeInputEnd />}
        calendarContainer={MyContainer}
        />
      </>
    )
}

export default DateRange
