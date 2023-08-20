import {React, useState} from "react";
import "./Revenu.css"
import RepeatedEvent from "./RepetedEvent";
import { FiSettings } from 'react-icons/fi';
import ModifiableValue from "./ModifiableValue";

export default function Revenu(props){

    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);
    const [folded, setFolded] = useState(true);

    return (
        <>
            <div onContextMenu={(e) => {e.preventDefault(); console.log("Right Click");}} className="revenu_container">
                <div className="revenu_header_line">
                    <ModifiableValue onChangeFunction={setTitle} placeholder="Title" type="text" className="revenu_title"/>
                    <ModifiableValue onChangeFunction={setValue} placeholder={0} type="number" className={`revenu_value ${ value>0? "positive_value" : value<0? "negative_value" : "paragraph_color" }`}/>
                </div>

                <div className="revenu_repetitions">repetition

                    <div className="revenu_setting_icon" onClick={() => setFolded(!folded)}>
                        <FiSettings stroke="white" strokeWidth={1.5}/>  
                    </div>
                </div>

                
                              
                <div className={`revenu_settings ${folded ? "settings_not_visible" : "settings_visible" }`}>
                    <RepeatedEvent mode="range" intervalpicker daypicker/>
                </div>
            </div>
        </>
    )
}