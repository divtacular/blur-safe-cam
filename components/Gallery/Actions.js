import React from 'react';
import {ActivityIndicator, Animated, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";

import {ImageContext} from "../../contexts/imageContext";

import GalleryStyles from "../../styles/Gallery";
import {getAssetInfoAsync} from "expo-media-library";

const iconSize = GalleryStyles.bottomBarActions.icons.fontSize;

const Actions = ({activeImage, applyFaceData, blurredFacesState}) => {
    const {removeFromGallery} = React.useContext(ImageContext);

    const [blurredFaces, setBlurredFaces] = blurredFacesState;
    const [hasFaceData, setHasFaceData] = React.useState(false);
    const [animatedValue] = React.useState(new Animated.Value(0.3))

    React.useEffect(() => {
        setHasFaceData(activeImage && Object.keys(activeImage).includes('faceData'));
    }, [activeImage]);

    React.useEffect(() => {
        hasFaceData && Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300
        }).start();
    }, [hasFaceData]);

    const saveImage = () => {

    }

    const editImage = () => {
    }

    const deleteImage = () => {
        removeFromGallery(activeImage);
    }

    const resetImage = () => {
        setBlurredFaces(false);
    }

    const defaultActions = () => {
        //blurredFaces
        return (
            <>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Apply blur to faces"
                    accessibilityHint={`Apply blur to faces found in the image shown`}
                    onPress={applyFaceData}
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
                {!blurredFaces && defaultActions()}
                {blurredFaces && saveActions()}
            </View>
        </View>
    )
}

export default Actions;