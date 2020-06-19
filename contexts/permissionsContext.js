import React, {createContext} from 'react';
import {askAsync, CAMERA, CAMERA_ROLL} from "expo-permissions";

export const PermissionsContext = createContext();

const PermissionsContextProvider = (props) => {
    const [permissions, setPermissions] = React.useState({
        cameraPermission: false,
        mediaLibraryPermission: false
    });

    React.useEffect(() => {
        (async () => {
            const cameraStatus = await askAsync(CAMERA);
            const mediaLibraryStatus = await askAsync(CAMERA_ROLL);

            setPermissions({
                cameraPermission: cameraStatus.status === 'granted',
                mediaLibraryPermission: mediaLibraryStatus.status === 'granted'
            });
        })();
    }, []);

    return (
        <PermissionsContext.Provider value={{...permissions}}>
            {props.children}
        </PermissionsContext.Provider>
    );
}

export default PermissionsContextProvider;