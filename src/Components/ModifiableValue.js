import {React, useState} from "react";
import "./ModifiableValue.css";


export default function ModifiableValue(props){

    const handleChange = (event) => {
        props.onChangeFunction(event.target.value);
    }

    return (
        <>
            <input onChange={handleChange} type={props.type} placeholder={props.placeholder} className={`modifiable_value ${props.className}`}></input>
        </>
    )
}