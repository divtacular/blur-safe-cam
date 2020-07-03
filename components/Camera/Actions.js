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

const Actions = ({cameraRef, actions, isZooming}) => {
    const {reducerActions} = React.useContext(StoreContext);
    const {orientation} = React.useContext(OrientationContext);
    const {mediaLibraryPermission} = React.useContext(PermissionsContext);

    const [flash, setFlash] = actions.flashState;
    const [cameraSource, setCameraSource] = actions.cameraSourceState;
    const [icons, setIcons] = React.useState({});

    const [canCapture, setCanCapture] = React.useState(true);

    const [actionsAnimatedValue] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        const cameraSourceIconName = Camera.Constants.Type.front === cameraSource ? 'front' : 'rear';
        setIcons({
            flash: ICONS.FLASH_ICONS[flash],
            camera: ICONS.CAMERA_SOURCE_ICONS[cameraSourceIconName]
        });
    }, [flash, cameraSource]);

    React.useEffect(() => {
        !isZooming && Animated.timing(actionsAnimatedValue, {
            toValue: orientation,
            duration: 150,
            useNativeDriver: true
        }).start();
    }, [orientation]);

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
        if (cameraRef && canCapture) {
            setCanCapture(false);
            cameraRef.current.takePictureAsync().then((res) => {
                let rotation = orientation;
                //fix front camera orientation
                if (cameraSource === Camera.Constants.Type.front) {
                    rotation = orientation === 90 ? -90 : 90;
                }

                manipulateAsync(
                    res.uri,
                    [{rotate: rotation}],
                    {compress: 0.8, format: SaveFormat.JPEG}
                ).then((image) => {
                    reducerActions.addImage(image);
                    setCanCapture(true);
                });

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
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Toggle Camera Source"
                accessibilityHint={`Switch to ${cameraSource === Camera.Constants.Type.front ? 'front' : 'back'} camera`}
                onPress={toggleCameraSource}
                style={CameraStyles.bottomBarActions.iconWrapper}
            >
                <RotatingIcon actionsAnimatedValue={actionsAnimatedValue}>
                    <IconMat name={icons.camera} size={iconSize / 1.9} color={"#fff"}/>
                </RotatingIcon>
            </TouchableOpacity>

            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Take photograph"
                onPress={takePicture}
                style={CameraStyles.bottomBarActions.iconWrapper}
            >
                <RotatingIcon actionsAnimatedValue={actionsAnimatedValue}>
                    <IconMat name={ICONS.CAMERA_SHUTTER}
                             size={iconSize}
                             style={{opacity: canCapture ? 1 : 0.1}}
                             color={"#fff"}
                    />
                </RotatingIcon>
            </TouchableOpacity>

            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Toggle flash setting"
                accessibilityHint={`Flash is ${flash}`}
                onPress={toggleFlash}
                style={CameraStyles.bottomBarActions.iconWrapper}
            >
                <RotatingIcon actionsAnimatedValue={actionsAnimatedValue}>
                    <IconMat name={icons.flash} size={iconSize / 1.9} color={"#fff"}/>
                </RotatingIcon>
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(Actions);