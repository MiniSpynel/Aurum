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

    useEffect(() => {
      console.log(time);
    }, [time])
    
    return (
        <>
          {props.intervalpicker && (
            <>
              <div className="repeated_event_headers">Interval :</div>
              <IntervalPicker/>
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
                    onSelect={setDate}
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
  const [interval, setInterval] = useState({"interval_type": "Jours", "interval_data": 1});

  // Event handlers to update the 'time' state
  const handleIntervalTypeChange = (event) => {
      const intervalType = event.target.value;
      setInterval({"interval_type": intervalType, "interval_data": interval["interval_data"]});
  };

  const handleIntervalValueChange = (event) => {
      const intervalData = event.target.value;
      setInterval({"interval_type": interval["interval_type"], "interval_data": intervalData});
  };

  useEffect(() => {
      console.log(interval)
  }, [interval])

  return(
      <>
          <div style={props.style} className="interval_picker">
              <div className={`interval-selectors ${interval["interval_type"]==="X jours" ? "width_fifty" : "width_zero"}`}>
                  <input value={interval["interval_data"]} onChange={handleIntervalValueChange} type='number' placeholder='00'/>
              </div>

              <div className={`interval-selectors interval_type_selector ${interval["interval_type"]==="Jours" ? "width_full" : "width_fifty"}`}>
                  <select name="type_d_intervalle" value={interval["interval_type"]} onChange={handleIntervalTypeChange}>
                      <option value="X jours">Every X days</option>
                      <option value="Jours">Every day</option>
                      <option value="Semaines">Every week</option>
                      <option value="Mois">Every month</option>
                  </select>
              </div>
              
              <div className={`interval-selectors interval_data_selector ${interval["interval_type"]==="Mois" ? "width_fifty" : "width_zero"}`}>
                  <select name="numero_du_mois" value={interval["interval_data"]} onChange={handleIntervalValueChange}>
                      <option value="00">00</option>
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

              <div className={`interval-selectors interval_data_selector ${interval["interval_type"]==="Semaines" ? "width_fifty" : "width_zero"}`}>
                  <select name="jour_de_la_semaine" value={interval["interval_data"]} onChange={handleIntervalValueChange}>
                      <option value="Lundi">Monday</option>
                      <option value="Mardi">Tusday</option>
                      <option value="Mercredi">Wednesday</option>
                      <option value="Jeudi">Thursday</option>
                      <option value="Vendredi">Friday</option>
                      <option value="Samedi">Saturday</option>
                      <option value="Dimanche">Sunday</option>
                  </select>
              </div>
              
          </div>
      </>
  )
}