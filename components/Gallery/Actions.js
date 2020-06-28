import React from 'react';
import {ActivityIndicator, Animated, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";

import GalleryStyles from "../../styles/Gallery";

const iconSize = GalleryStyles.bottomBarActions.icons.fontSize;

const Actions = ({activeImage, isShowingBlurredFaces, actions}) => {
    const {blurFaces, deleteImage, saveImage, resetImage} = actions;
    const [animatedValue] = React.useState(new Animated.Value(0.1));
    const [hasFaceData, setHasFaceData] = React.useState(false);

    React.useEffect(() => {
        setHasFaceData(Object.keys(activeImage).includes('faceData'));
    }, [activeImage]);

    React.useEffect(() => {
        hasFaceData && Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [hasFaceData]);

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
                    <Animated.View style={{opacity: animatedValue}}>
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
        <View style={GalleryStyles.bottomBarActions.wrapper}>
            <View style={GalleryStyles.bottomBarActions}>
                {!isShowingBlurredFaces && defaultActions()}
                {!!isShowingBlurredFaces && saveActions()}
            </View>
        </View>
    )
}

export default Actions;