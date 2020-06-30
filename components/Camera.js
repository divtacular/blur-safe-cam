import React from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import {useIsFocused} from '@react-navigation/native';

import {GalleryContext} from "../contexts/galleryContext";
import {PermissionsContext} from "../contexts/permissionsContext";

import Actions from "./Camera/Actions";
import Zoom from "./Camera/Zoom";
import PreviewDot from './Camera/PreviewDot'

import CameraStyles from '../styles/Camera';

const CameraView = () => {
    const isFocused = useIsFocused();
    const {preview} = React.useContext(GalleryContext);
    const {cameraPermission} = React.useContext(PermissionsContext);

    const [zoom, setZoom] = React.useState(0);
    const [flash, setFlash] = React.useState('off');
    const [aspectRatio, setAspectRatio] = React.useState('16:9');
    const [cameraSource, setCameraSource] = React.useState(Camera.Constants.Type.back);

    const camera = React.useRef();

    const setRatio = () => {
        (async () => {
            const ratios = await camera.current.getSupportedRatiosAsync();
            if (!ratios.includes(aspectRatio)) {
                const compatibleRatio = ratios.pop();
                setAspectRatio(compatibleRatio);
            }
        })();
    };

//TODO component for awaiting permissions or Gallery loading state
//<PermissionComponent text={} />
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
                    skipProcessing={true}
                >
                    {preview && <PreviewDot preview={preview}/>}
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
