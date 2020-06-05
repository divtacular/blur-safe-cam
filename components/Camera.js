import React, {useState, useEffect, useRef} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {Camera} from 'expo-camera';

import {WB_ICONS, WB_ORDER, FLASH_ICONS, FLASH_ORDER} from "../constants/camera";
import CameraStyles from '../styles/Camera';

const CameraView = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState('auto');

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

    const takePicture = () => {
        if (camera) {
            camera.current.takePictureAsync({
                onPictureSaved: (photo) => {
                    console.log(photo);
                }
            });
        }
    };

    const toggleCameraSource = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const toggleFlash = () => {
        setFlash(flash === 'auto' ? 'torch' : 'auto');
    };

    return (
        <Camera ref={camera}
                style={CameraStyles.camera}
                type={type}
                ratio={aspectRatio}
                onCameraReady={setRatio}
                flashMode={flash}
        >
            <View style={CameraStyles.debug}>
                <Text style={CameraStyles.debug.text}>
                    Screen: {screenWidth} x {screenHeight}
                </Text>
            </View>

            <View
                style={CameraStyles.bottomBar}>
                <TouchableOpacity
                    style={CameraStyles.bottomBar.item}
                    onPress={toggleCameraSource}
                >
                    <Text style={CameraStyles.bottomBar.text}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={CameraStyles.bottomBar.item}
                    onPress={takePicture}
                >
                    <Text style={CameraStyles.bottomBar.text}>Capture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={CameraStyles.bottomBar.item}
                    onPress={toggleFlash}
                >
                    <Text style={CameraStyles.bottomBar.text}>Flash</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}

export default CameraView;
