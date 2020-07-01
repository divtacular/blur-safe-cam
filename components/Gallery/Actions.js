import React from 'react';
import {ActivityIndicator, Animated, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";
import {OrientationContext} from "../../contexts/orientationContext";

import GalleryStyles from "../../styles/Gallery";

const Actions = ({croppedFacesState, actions, activeImage}) => {
    const {orientation} = React.useContext(OrientationContext);

    const {blurFaces, deleteImage, resetImage, saveImage} = actions;
    const [croppedFaces] = croppedFacesState;

    const [orientationText, setOrientationText] = React.useState('portrait');
    const [editingBlur, setEditingBlur] = React.useState(false);
    const [activeBlur, setActiveBlur] = React.useState(false);
    const [hasFaceData, setHasFaceData] = React.useState(false);

    const [faceAnimatedValue] = React.useState(new Animated.Value(0.1));
    const [actionsAnimatedValue] = React.useState(new Animated.Value(0));

    const iconSize = GalleryStyles.bottomBarActions.icons[orientationText].fontSize;

    React.useEffect(() => {
        setOrientationText(orientation === 0 ? 'portrait' : 'landscape');
    }, [orientation]);

    //Update state when a blur has been selected for editing
    React.useEffect(() => {
        setActiveBlur(croppedFaces.filter((face) => {
            return face.isSelected
        }).length > 0);
    }, [croppedFaces]);

    //Update state when showing blurs on face
    React.useEffect(() => {
        setEditingBlur(croppedFaces.length > 0);
    }, [croppedFaces])

    //Update state when facedata has been processed async
    React.useEffect(() => {
        setHasFaceData(activeImage && !!activeImage.faceData);
    }, [activeImage]);

    //Animate icon opacity when face data set
    React.useEffect(() => {
        hasFaceData && Animated.timing(faceAnimatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [hasFaceData]);

    //Animate draw when editing face blur
    React.useEffect(() => {
        Animated.timing(actionsAnimatedValue, {
            toValue: activeBlur === false ? 0 : 1,
            duration: 100,
            useNativeDriver: true
        }).start();
    }, [activeBlur]);

    const defaultActions = () => {
        return (
            <>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Apply blur to faces"
                    accessibilityHint={`Apply blur to faces found in the image shown`}
                    onPress={blurFaces}
                    style={GalleryStyles.bottomBarActions.item.portrait}
                >
                    <ActivityIndicator animating={!hasFaceData} size={60} color="#fff" style={{
                        position: 'absolute',
                    }}/>
                    <Animated.View style={{opacity: faceAnimatedValue}}>
                        <IconMat name={ICONS.faceDetection}
                                 size={iconSize / 1.4}
                                 color={"#fff"}
                        />
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Delete image"
                    accessibilityHint={`Permanently delete the image shown`}
                    onPress={deleteImage}
                    style={GalleryStyles.bottomBarActions.item.portrait}
                >
                    <IconMat name={ICONS.delete} size={iconSize} color={"#fff"}/>
                </TouchableOpacity>
            </>
        )
    }

    const saveActions = () => {
        return (
            <>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Apply blur to faces"
                    accessibilityHint={`Apply blur to faces found in the image shown`}
                    onPress={saveImage}
                    style={GalleryStyles.bottomBarActions.item.portrait}
                >
                    <IconMat name={ICONS.commit} size={iconSize / 1.4} color={"#fff"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Reset image"
                    accessibilityHint={`Remove blurs and revert image to original state`}
                    onPress={resetImage}
                    style={GalleryStyles.bottomBarActions.item.portrait}
                >
                    <IconMat name={ICONS.undo} size={iconSize / 1.4} color={"#fff"}/>
                </TouchableOpacity>
            </>
        );
    }

    return (
        <Animated.View style={{
            ...GalleryStyles.bottomBarActions.wrapper, transform: [{
                translateY: actionsAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150]
                }),
            }]
        }}>
            <View style={GalleryStyles.bottomBarActions}>
                {!editingBlur && defaultActions()}
                {editingBlur && saveActions()}
            </View>
        </Animated.View>
    )
}

export default React.memo(Actions);