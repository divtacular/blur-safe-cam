import React from 'react';
import {TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";

import GalleryStyles from "../../styles/Gallery";

const iconSize = GalleryStyles.bottomBarActions.icons.fontSize;

const Actions = ({applyFaceData}) => {

    const deleteImage = () => {
    }

    const saveImage = () => {
    }

    const editImage = () => {
    }

    console.log('rendering actions');

    return (
        <View style={GalleryStyles.bottomBarActions.wrapper}>
            <View style={GalleryStyles.bottomBarActions}>

                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Apply blur to faces"
                    accessibilityHint={`Apply blur to faces found in the image shown`}
                    onPress={applyFaceData}
                    style={GalleryStyles.bottomBarActions.item.portrait}
                >
                    <IconMat name={ICONS.faceDetection} size={iconSize/1.4} color={"#fff"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Delete image"
                    accessibilityHint={`Permanently delete the image shown`}
                    style={GalleryStyles.bottomBarActions.item.portrait}
                >
                    <IconMat name={ICONS.delete} size={iconSize} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Actions;