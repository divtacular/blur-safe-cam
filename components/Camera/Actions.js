import React from 'react';
import {Camera} from "expo-camera";
import {documentDirectory, moveAsync} from "expo-file-system";
import {TouchableOpacity, View} from "react-native";
import {MaterialIcons as IconMat} from '@expo/vector-icons';

import CameraStyles from "../../styles/Camera";
import {ImageContext} from "../../contexts/imageContext";

import {ICONS, FLASH_ORDER} from "../../constants/camera";
import {PATHS} from "../../constants/app";

const Actions = ({cameraRef, actions}) => {
    const iconSize = CameraStyles.bottomBarActions.icons.fontSize;

    const {previewState} = React.useContext(ImageContext);

    const [preview, setPreview] = previewState;
    const [flash, setFlash] = actions.flashState;
    const [cameraSource, setCameraSource] = actions.cameraSourceState;

    const [icons, setIcons] = React.useState({})

    React.useEffect(() => {
        const cameraSourceIconName = Camera.Constants.Type.front === cameraSource ? 'front' : 'rear';
        const newIcons = {
            flash: ICONS.FLASH_ICONS[flash],
            camera: ICONS.CAMERA_SOURCE_ICONS[cameraSourceIconName]
        };

        setIcons(newIcons);
    }, [flash, cameraSource]);

    const takePicture = () => {
        if (cameraRef) {
            cameraRef.current.takePictureAsync({
                onPictureSaved: (photo) => {
                    setPreview(photo);
                    savePhoto(photo);
                }
            });
        }
    };

    const savePhoto = async (photo) => {
        const movePath = documentDirectory + PATHS.IMAGES;
        //const file = await moveAsync(photo.uri, movePath);

        console.log(file);
    };

    const toggleCameraSource = () => {
        setCameraSource(
            cameraSource === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
        );
    };

    const toggleFlash = () => {
        const keys = Object.keys(FLASH_ORDER);
        const index = keys.indexOf(flash);
        const newIndex = (index === keys.length-1 ? 0 : index+1);

        setFlash(FLASH_ORDER[keys[newIndex]]);
    };

    return (
        <View style={CameraStyles.bottomBarActions}>
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Toggle Camera Source"
                accessibilityHint={`Switch to ${cameraSource === Camera.Constants.Type.front ? 'front':'back'} camera`}
                onPress={toggleCameraSource}
                style={CameraStyles.bottomBarActions.item.portrait}
            >
                <IconMat name={icons.camera} size={iconSize/1.9} color={"#fff"}/>
            </TouchableOpacity>
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Take photograph"
                onPress={takePicture}
                style={CameraStyles.bottomBarActions.item.portrait}
            >
                <IconMat name={ICONS.CAMERA_SHUTTER} size={iconSize} color={"#fff"}/>
            </TouchableOpacity>
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Toggle flash setting"
                accessibilityHint={`Flash is ${flash}`}
                onPress={toggleFlash}
                style={CameraStyles.bottomBarActions.item.portrait}
            >
                <IconMat name={icons.flash} size={iconSize/1.9} color={"#fff"}/>
            </TouchableOpacity>
        </View>
    );
};

export default Actions;