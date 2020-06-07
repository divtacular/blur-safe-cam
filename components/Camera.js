import React, {useState, useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {Camera} from 'expo-camera';

import {WB_ICONS, WB_ORDER, FLASH_ICONS, FLASH_ORDER} from "../constants/camera";

import {CameraContext} from "../contexts/cameraContext";
import {ImageContext} from "../contexts/imageContext";
import Actions from "./Camera/Actions";

import CameraStyles from '../styles/Camera';

const CameraView = () => {
    const {flashState, typeState} = React.useContext(CameraContext);

    const [flash, setFlash] = flashState;
    const [type, setType] = typeState;

    const [hasPermission, setHasPermission] = useState(null);
    const [aspectRatio, setAspectRatio] = useState('16:9');

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    const camera = useRef();

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    const setRatio = () => {
        (async () => {
            const ratios = await camera.current.getSupportedRatiosAsync();
            if (!ratios.includes(aspectRatio)) {
                const compatibleRatio = ratios.pop();
                setAspectRatio(compatibleRatio);
            }
        })();
    }

    // const onFacesDetected = (faces) => {
    //     console.log(faces);
    // }

    return (
        <Camera ref={camera}
                style={CameraStyles.camera}
                type={type}
                ratio={aspectRatio}
                flashMode={flash}
                onCameraReady={setRatio}
        >
            <View style={CameraStyles.debug}>
                <Text style={CameraStyles.debug.text}>
                    Screen: {screenWidth} x {screenHeight}
                </Text>
            </View>

            <Actions cameraRef={camera} />

        </Camera>
    );
}

export default CameraView;
