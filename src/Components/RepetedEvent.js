import {React, useEffect, useState} from "react";
import { DayPicker } from "react-day-picker";
import { en } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import './RepeatedEvent.css';

export default function RepeatedEvent(props){

    const [time, setTime] = useState([0, 0]);
    const [date, setDate] = useState();

    var yesterday = new Date();
    yesterday = yesterday.setDate(yesterday.getDate() - 1);
    const disabledDays = [
        { from: new Date(2023, 1, 1), to: yesterday }
    ];

    
    return (
        <>
          {props.intervalpicker && (
            <>
              <div className="repeated_event_headers">Interval :</div>
              <IntervalPicker setIntervalType={props.setIntervalType} setNumberOfDays={props.setNumberOfDays} setWeekDay={props.setWeekDay} setDayNumber={props.setDayNumber}/>
            </>
          )}

          {(props.timepicker || props.daypicker) && (<div className="repeated_event_headers">Starting from :</div>)}

          {props.timepicker && (<TimePicker setTimeFunction={setTime}/>)}

          {props.daypicker && (<DayPicker
                    mode={props.mode}
                    styles={{
                        caption: { color: 'var(--main1)' }
                    }}
                    captionLayout="dropdown-buttons" fromYear={2023} toYear={2050}
                    selected={date}
                    onSelect={(date) => {
                      if (props.setStartingDate) {
                        props.setStartingDate(date);
                        setDate(date);
                      } else {
                        setDate(date);
                      }
                    }}
                    weekStartsOn={1}
                    disabled={disabledDays}
                     
          />)}
        </>
    )
}

export function TimePicker(props) {
    const [time, setTime] = useState([0, 0]);

    const changeTime = (array) => {
      props.setTimeFunction(array);
      setTime(array);
    }

    const handleHourChange = (event) => {
      const selectedHour = parseInt(event.target.value);
      props.setTimeFunction? changeTime([selectedHour, time[1]]) : setTime([selectedHour, time[1]]);
    };

    const handleMinuteChange = (event) => {
      const selectedMinute = parseInt(event.target.value);
      props.setTimeFunction? changeTime([time[0], selectedMinute]) : setTime([time[0], selectedMinute]);
    };
  
    return (
      <>
        <div style={props.style} className="time_picker">
          <div className="time-selectors hour_selector">
            <select name="hours" value={time[0].toString().padStart(2, "0")} onChange={handleHourChange}>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <option key={hour} value={hour.toString().padStart(2, "0")}>
                  {hour.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          <div className='time-separator'>:</div>
  
          <div className="time-selectors minute_selector">
            <select name="minutes" value={time[1].toString().padStart(2, "0")} onChange={handleMinuteChange}>
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <option key={minute} value={minute.toString().padStart(2, "0")}>
                  {minute.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
}

export function IntervalPicker(props){
  const [intervalType, setIntervalType] = useState("Every day");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [weekDay, setWeekDay] = useState("Monday");
  const [dayNumber, setDayNumber] = useState(1);

  const handleIntervalTypeChange = (event) => {
      const intervalType = event.target.value;
      setIntervalType(intervalType);
      if (props.setIntervalType) {
        props.setIntervalType(intervalType);
      }
  };

  const handleIntervalValueChange = (event) => {
      const intervalData = event.target.value;

      switch(intervalType){
        case "Every X days":
          setNumberOfDays(intervalData);
          if (props.setNumberOfDays) {
            props.setNumberOfDays(intervalData);
          }
          break;
        case "Every week":
          setWeekDay(intervalData);
          if (props.setWeekDay) {
            props.setWeekDay(intervalData);
          }
          break;
        case "Every month":
          setDayNumber(intervalData);
          if (props.setDayNumber) {
            props.setDayNumber(intervalData);
          }
          break;
        default:
          break;
      }
  };

  return(
      <>
          <div style={props.style} className="interval_picker">
              <div className={`interval-selectors ${intervalType==="Every X days" ? "width_fifty" : "width_zero"}`}>
                  <input value={numberOfDays} onChange={handleIntervalValueChange} type='number' placeholder='00'/>
              </div>

              <div className={`interval-selectors interval_type_selector ${intervalType==="Every day" ? "width_full" : "width_fifty"}`}>
                  <select name="type_d_intervale" value={intervalType} onChange={handleIntervalTypeChange}>
                      <option value="Every day">Every day</option>
                      <option value="Every X days">Every X days</option>
                      <option value="Every week">Every week</option>
                      <option value="Every month">Every month</option>
                  </select>
              </div>
              
              <div className={`interval-selectors interval_data_selector ${intervalType==="Every month" ? "width_fifty" : "width_zero"}`}>
                  <select name="numero_du_mois" value={dayNumber} onChange={handleIntervalValueChange}>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                  </select>
              </div>

              <div className={`interval-selectors interval_data_selector ${intervalType==="Every week" ? "width_fifty" : "width_zero"}`}>
                  <select name="jour_de_la_semaine" value={weekDay} onChange={handleIntervalValueChange}>
                      <option value="Monday">Monday</option>
                      <option value="Tusday">Tusday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                  </select>
              </div>
              
          </div>
      </>
  )
}