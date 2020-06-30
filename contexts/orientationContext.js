import React, {createContext} from 'react';
import {DeviceMotion} from "expo-sensors";

import {getOrientation} from "../utils/helpers";

export const OrientationContext = createContext();

const OrientationContextProvider = (props) => {
    const [orientation, setOrientation] = React.useState(0);

    React.useEffect(() => {
        DeviceMotion.isAvailableAsync().then(() => {
            DeviceMotion.setUpdateInterval(300);
            DeviceMotion.addListener((motionEvent) => {
                const liveOrientation = getOrientation(motionEvent.rotation);
                setOrientation((prev) => {
                    return prev === liveOrientation ? prev : liveOrientation;
                });
            });
        })
    }, []);

    return (
        <OrientationContext.Provider value={{orientation}}>
            {props.children}
        </OrientationContext.Provider>
    );
}

export default OrientationContextProvider;