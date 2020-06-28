import React from 'react';
import {ActivityIndicator, Animated, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";

import GalleryStyles from "../../styles/Gallery";

const iconSize = GalleryStyles.bottomBarActions.icons.fontSize;

const Actions = ({activeImage, actions}) => {
    const {blurFaces, deleteImage, saveImage, resetImage} = actions;
    const [faceAnimatedValue] = React.useState(new Animated.Value(0.3));
    const [actionsAnimatedValue] = React.useState(new Animated.Value(0));
    const [hasFaceData, setHasFaceData] = React.useState(false);

    const isShowingBlurredFaces= false;

    React.useEffect(() => {
        console.log(activeImage.faceData);
        setHasFaceData(!!activeImage.faceData);
    }, [activeImage]);

    React.useEffect(() => {
        hasFaceData && Animated.timing(faceAnimatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [hasFaceData]);

    // React.useEffect(() => {
    //     Animated.timing(actionsAnimatedValue, {
    //         toValue: activeBlur === false ? 0 : 1,
    //         duration: 100,
    //         useNativeDriver: true
    //     }).start();
    // }, [activeBlur]);

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
        <Animated.View style={{...GalleryStyles.bottomBarActions.wrapper, transform: [{
                translateY: actionsAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 150]  // 0 : 150, 0.5 : 75, 1 : 0
                }),
            }]}}>
            <View style={GalleryStyles.bottomBarActions}>
                {!isShowingBlurredFaces && defaultActions()}
                {!!isShowingBlurredFaces && saveActions()}
            </View>
        </Animated.View>
    )
}

export default Actions;