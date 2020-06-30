import React from 'react';
import {Animated, Text, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";
import {manipulateAsync, FlipType, SaveFormat} from 'expo-image-manipulator';
import {MaterialCommunityIcons as IconMat} from '@expo/vector-icons';

import {StoreContext} from "../../store/StoreContext";
import {OrientationContext} from "../../contexts/orientationContext";
import {PermissionsContext} from "../../contexts/permissionsContext";

import RotatingIcon from "../helpers/RotatingIcon";

import CameraStyles from "../../styles/Camera";
import {ICONS, FLASH_ORDER} from "../../constants/camera";

const iconSize = CameraStyles.bottomBarActions.icons.fontSize;

const Actions = ({cameraRef, actions}) => {
    const {reducerActions} = React.useContext(StoreContext);
    const {orientation} = React.useContext(OrientationContext);
    const {mediaLibraryPermission} = React.useContext(PermissionsContext);

    const [flash, setFlash] = actions.flashState;
    const [cameraSource, setCameraSource] = actions.cameraSourceState;
    const [icons, setIcons] = React.useState({});

    React.useEffect(() => {
        const cameraSourceIconName = Camera.Constants.Type.front === cameraSource ? 'front' : 'rear';
        setIcons({
            flash: ICONS.FLASH_ICONS[flash],
            camera: ICONS.CAMERA_SOURCE_ICONS[cameraSourceIconName]
        });
    }, [flash, cameraSource]);

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
        const newIndex = (index === keys.length - 1 ? 0 : index + 1);

        setFlash(FLASH_ORDER[keys[newIndex]]);
    };

    const takePicture = () => {
        if (cameraRef) {
            cameraRef.current.takePictureAsync().then((res) => {
                if (orientation !== 0) {
                    manipulateAsync(
                        res.uri,
                        [{rotate: orientation}],
                        {compress: 1, format: SaveFormat.JPEG}
                    ).then((image) => {
                        reducerActions.addImage(image);
                    });
                } else {
                    reducerActions.addImage(res);
                }
            }).catch((e) => {
                console.log('error: take picture', e)
            });
        }
    };

    if (!mediaLibraryPermission) {
        return (
            <View style={CameraStyles.bottomBarActions}>
                <Text>Media Library Permissions Required</Text>
            </View>
        );
    }

    return (
        <View style={CameraStyles.bottomBarActions}>
            <RotatingIcon>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Toggle Camera Source"
                    accessibilityHint={`Switch to ${cameraSource === Camera.Constants.Type.front ? 'front' : 'back'} camera`}
                    onPress={toggleCameraSource}
                    style={CameraStyles.bottomBarActions.item}
                >
                    <IconMat name={icons.camera} size={iconSize / 1.9} color={"#fff"}/>
                </TouchableOpacity>
            </RotatingIcon>

            <RotatingIcon>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Take photograph"
                    onPress={takePicture}
                    style={CameraStyles.bottomBarActions.item}
                >
                    <IconMat name={ICONS.CAMERA_SHUTTER} size={iconSize} color={"#fff"}/>
                </TouchableOpacity>
            </RotatingIcon>

            <RotatingIcon>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Toggle flash setting"
                    accessibilityHint={`Flash is ${flash}`}
                    onPress={toggleFlash}
                    style={CameraStyles.bottomBarActions.item}
                >
                    <IconMat name={icons.flash} size={iconSize / 1.9} color={"#fff"}/>
                </TouchableOpacity>
            </RotatingIcon>
        </View>
    );
};

export default Actions;