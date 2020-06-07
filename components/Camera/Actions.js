import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";

import CameraStyles from "../../styles/Camera";
import {CameraContext} from "../../contexts/cameraContext";
import {ImageContext} from "../../contexts/imageContext";

const Actions = ({cameraRef}) => {

    const {flashState, typeState} = React.useContext(CameraContext);
    const {imageState, showPreviewState} = React.useContext(ImageContext);

    const [image, setImage] = imageState;
    const [showPreview, setShowPreview] = showPreviewState;

    const [flash, setFlash] = flashState;
    const [type, setType] = typeState;

    const takePicture = () => {
        if (cameraRef) {
            cameraRef.current.takePictureAsync({
                onPictureSaved: (photo) => {
                    setImage(photo);
                    setShowPreview(true);
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
    );
};

export default Actions;