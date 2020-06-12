import React, {createContext, useState} from 'react';
import {Camera} from "expo-camera";

export const CameraContext = createContext();

const CameraContextProvider = (props) => {

    const flashState = useState('auto');
    //const [flash, setFlash] = flashState;

    const typeState = useState(Camera.Constants.Type.back)
    //const [type, setType] = typeState;

    return (
        <CameraContext.Provider value={{flashState, typeState}}>
            {props.children}
        </CameraContext.Provider>
    );
}

export default CameraContextProvider;