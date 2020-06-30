import React, {createContext} from 'react';
import {DeviceMotion} from "expo-sensors";

import {getOrientation} from "../utils/helpers";

export const OrientationContext = createContext();

const OrientationContextProvider = (props) => {
    const [orientationValues, setOrientationValues] = React.useState({
        orientation: 'portrait',
        rotation: 0
    });

    React.useEffect(() => {
        DeviceMotion.isAvailableAsync().then(() => {
            DeviceMotion.setUpdateInterval(500);
            DeviceMotion.addListener((motionEvent) => {
                setOrientationValues(getOrientation(motionEvent.rotation));
            });
        })
    }, []);

    return (
        <OrientationContext.Provider value={{orientationValues}}>
            {props.children}
        </OrientationContext.Provider>
    );
}

export default OrientationContextProvider;