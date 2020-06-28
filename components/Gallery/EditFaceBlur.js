import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";
import GalleryStyles from "../../styles/Gallery";

const EditFaceBlur = ({activeBlurState, croppedFacesState}) => {

    const [activeBlur, setActiveBlur] = activeBlurState;
    const [croppedFaces, setCroppedFaces] = croppedFacesState;

    const [blurApplied, setBlurApplied] = React.useState(false);

    return (
        <View style={GalleryStyles.blurActions.wrapper}>
            <View style={GalleryStyles.blurActions}>
                <View style={GalleryStyles.blurActions.actionItem.portrait}>
                    <IconMat name={ICONS.faceDetection} size={25} color={"#fff"}/>
                </View>

                {!blurApplied && <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Remove blur on face"
                    accessibilityHint="Remove blur on face"
                    style={GalleryStyles.blurActions.item.portrait}
                    onPress={() => {
                        croppedFaces[activeBlur].isHidden = true;
                        setCroppedFaces([...croppedFaces]);
                        setBlurApplied(true);
                    }}
                >
                    <IconMat name={ICONS.delete} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>}

                {blurApplied && <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Save changes"
                    accessibilityHint="save changes and go back to main gallery"
                    style={GalleryStyles.blurActions.item.portrait}
                    onPress={() => {
                        setActiveBlur(false);
                        setBlurApplied(false);
                    }}
                >
                    <IconMat name={ICONS.commit} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>}

                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Stop editing"
                    accessibilityHint="Reset and go back to gallery"
                    style={GalleryStyles.blurActions.item.portrait}
                    onPress={() => {
                        croppedFaces[activeBlur].isHidden = false;
                        setCroppedFaces([...croppedFaces]);
                        setBlurApplied(false);
                    }}
                >
                    <IconMat name={ICONS.undo} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditFaceBlur;