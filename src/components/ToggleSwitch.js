import React from "react";
import Switch from "react-switch";

const ToggleSwitch = ({handleChange, checked}) => {

    return (
        <label>
            <Switch onChange={handleChange} checked={checked} />
        </label>
    );
}

export default ToggleSwitch;