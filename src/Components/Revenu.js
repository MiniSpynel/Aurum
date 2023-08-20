import {React, useState, useEffect} from "react";
import dayjs from "dayjs";
import "./Revenu.css"
import RepeatedEvent from "./RepetedEvent";
import { FiSettings } from 'react-icons/fi';
import ModifiableValue from "./ModifiableValue";

export default function Revenu(props){

    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);
    const [folded, setFolded] = useState(true);

    const [intervalType, setIntervalType] = useState("Every day");
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [weekDay, setWeekDay] = useState("Monday");
    const [dayNumber, setDayNumber] = useState(1);

    const [startingDate, setStartingDate] = useState("");

    const getOrdinal = (number) => {
        const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
        const lastDigit = number % 10;
        const secondLastDigit = Math.floor((number % 100) / 10);
        
        // Special cases for 11, 12, and numbers ending with 11 and 12
        if (secondLastDigit === 1 || lastDigit > 3) {
          return `${number}th`;
        }
        
        const suffix = suffixes[lastDigit];
        return `${number}${suffix}`;
    };

    useEffect(() => {
        console.log(dayNumber)
    }, [dayNumber])

    return (
        <>
            <div onContextMenu={(e) => {e.preventDefault(); console.log("Right Click");}} className="revenu_container">
                <div className="revenu_header_line">
                    <ModifiableValue onChangeFunction={setTitle} placeholder="Title" type="text" className="revenu_title"/>
                    <ModifiableValue onChangeFunction={setValue} placeholder={0} type="number" className={`revenu_value ${ value>0? "positive_value" : value<0? "negative_value" : "paragraph_color" }`}/>
                </div>

                <div className="revenu_repetitions">{`${intervalType==="Every X days"? "Every " + numberOfDays + " days" : 
                                                        intervalType==="Every month"? "Every " + getOrdinal(dayNumber) + " of the month" :
                                                        intervalType==="Every week"? "Every " + weekDay : "Every day"} ${startingDate? "starting from " + startingDate.from.toLocaleString('en-US', {year:"numeric", month:"long", day:"numeric"}) : ""}`}

                    <div className="revenu_setting_icon" onClick={() => setFolded(!folded)}>
                        <FiSettings stroke="white" strokeWidth={1.5}/>  
                    </div>
                </div>

                
                              
                <div className={`revenu_settings ${folded ? "settings_not_visible" : "settings_visible" }`}>
                    <RepeatedEvent setStartingDate={setStartingDate} setIntervalType={setIntervalType} setNumberOfDays={setNumberOfDays} setWeekDay={setWeekDay} setDayNumber={setDayNumber} mode="range" intervalpicker daypicker/>
                </div>
            </div>
        </>
    )
}