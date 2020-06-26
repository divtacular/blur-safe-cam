import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";
import GalleryStyles from "../../styles/Gallery";

const EditFaceBlur = () => {
    return (
        <View style={GalleryStyles.blurActions.wrapper}>
            <View style={GalleryStyles.blurActions}>
                <View style={GalleryStyles.blurActions.actionItem.portrait}>
                    < IconMat name={ICONS.faceDetection} size={25} color={"#fff"}/>
                </View>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Apply blur to faces"
                    accessibilityHint={`Apply blur to faces found in the image shown`}
                    style={GalleryStyles.blurActions.item.portrait}
                >
                    <IconMat name={ICONS.delete} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Reset image"
                    accessibilityHint={`Remove blurs and revert image to original state`}
                    style={GalleryStyles.blurActions.item.portrait}
                >
                    <IconMat name={ICONS.undo} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditFaceBlur;