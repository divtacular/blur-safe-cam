import React from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {Camera} from 'expo-camera';

import {NavigationContext} from '@react-navigation/core';
import {ImageContext} from "../contexts/imageContext";
import {PermissionsContext} from "../contexts/permissionsContext";

import Actions from "./Camera/Actions";
import Zoom from "./Camera/Zoom";
import PreviewDot from './Camera/PreviewDot'

import CameraStyles from '../styles/Camera';
import {useIsFocused} from '@react-navigation/native';

const CameraView = () => {
    const {gallery} = React.useContext(ImageContext);
    //const {cameraPermission} = React.useContext(PermissionsContext);
const cameraPermission = true;
    const isFocused = useIsFocused();

    const [flash, setFlash] = React.useState('auto');
    const [zoom, setZoom] = React.useState(0);
    const [cameraSource, setCameraSource] = React.useState(Camera.Constants.Type.back);
    const [aspectRatio, setAspectRatio] = React.useState('16:9');

    const camera = React.useRef();

    const setRatio = () => {
        (async () => {
            const ratios = await camera.current.getSupportedRatiosAsync();
            if (!ratios.includes(aspectRatio)) {
                const compatibleRatio = ratios.pop();
                setAspectRatio(compatibleRatio);
            }
        })();
    }

    if (!cameraPermission) {
        return <View>
            <View>
                <Text>No access to camera</Text>
            </View>
        </View>;
    }

    return (
        <View style={CameraStyles.gestureWrapper}>
            <Zoom style={{flex: 1}} zoom={zoom} setZoom={setZoom}>

                {isFocused &&
                <Camera
                    flashMode={Camera.Constants.FlashMode[flash]}
                    onCameraReady={setRatio}
                    ratio={aspectRatio}
                    ref={camera}
                    type={cameraSource}
                    zoom={zoom}
                    style={CameraStyles.camera}
                >
                    {gallery.length > 0 && <PreviewDot gallery={gallery}/>}
                </Camera>
                }
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
