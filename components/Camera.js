import React from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {Camera} from 'expo-camera';

import { NavigationContext } from '@react-navigation/core';
import {ImageContext} from "../contexts/imageContext";

import Actions from "./Camera/Actions";
import Zoom from "./Camera/Zoom";
import PreviewDot from "./Camera/previewDot";

import CameraStyles from '../styles/Camera';

const CameraView = () => {
    const {previewState} = React.useContext(ImageContext);
    const navigation = React.useContext(NavigationContext);

    const [preview, setPreview] = previewState;
    const [flash, setFlash] = React.useState('auto');
    const [zoom, setZoom] = React.useState(0);
    const [cameraSource, setCameraSource] = React.useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = React.useState(null);
    const [aspectRatio, setAspectRatio] = React.useState('16:9');

    const camera = React.useRef();

    React.useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const setRatio = () => {
        (async () => {
            const ratios = await camera.current.getSupportedRatiosAsync();
            if (!ratios.includes(aspectRatio)) {
                const compatibleRatio = ratios.pop();
                setAspectRatio(compatibleRatio);
            }
        })();
    }

    if (!hasPermission) {
        return <View>
            <View>
                <Text>No access to camera</Text>
            </View>
        </View>;
    }

    return (
        <View style={CameraStyles.gestureWrapper}>
            <Zoom style={{flex: 1}} zoom={zoom} setZoom={setZoom}>
                <Camera
                    flashMode={Camera.Constants.FlashMode[flash]}
                    onCameraReady={setRatio}
                    ratio={aspectRatio}
                    ref={camera}
                    type={cameraSource}
                    zoom={zoom}
                    style={CameraStyles.camera}
                >
                    {preview && <PreviewDot />}
                </Camera>
            </Zoom>
            <Actions
                actions={{
                    flashState: [flash, setFlash],
                    cameraSourceState: [cameraSource, setCameraSource]
                }}
                cameraRef={camera}/>
        </View>
    );
}

export default CameraView;
