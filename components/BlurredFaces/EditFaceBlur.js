import React from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons as IconMat} from "@expo/vector-icons";
import {ICONS} from "../../constants/gallery";
import GalleryStyles from "../../styles/Gallery";

const EditFaceBlur = ({croppedFacesState}) => {

    const [croppedFaces, setCroppedFaces] = croppedFacesState;
    const [activeBlur, setActiveBlur] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const [actionsAnimatedValue] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(actionsAnimatedValue, {
            toValue: activeBlur === false ? 0 : 1,
            duration: 100,
            useNativeDriver: true
        }).start();
    }, [activeBlur]);

    React.useEffect(() => {
        setActiveBlur(croppedFaces.filter((face) => {
            return face.isSelected
        }).length > 0);
    }, [croppedFaces]);

    React.useEffect(() => {
        setIsVisible(croppedFaces.filter((face) => {
            if (face.isSelected) {
                return face.isHidden;
            }
        }).length > 0);
    }, [croppedFaces]);

    const toggleBlur = () => {
        setCroppedFaces(croppedFaces.map((face) => {
            if (face.isSelected) {
                face.isHidden = !face.isHidden
            }

            return face;
        }));
    };

    const cancelChanges = () => {
        setCroppedFaces(croppedFaces.map((face) => {
            face.isHidden = face.isSelected ? false : face.isHidden;
            face.isSelected = false
            return face;
        }));
    };

    const saveChanges = () => {
        setCroppedFaces(croppedFaces.map((face) => {
            face.isSelected = false;
            return face;
        }));
    };

    return (
        <Animated.View style={{
            ...GalleryStyles.blurActions.wrapper, transform: [{
                translateY: actionsAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-75, 0]
                }),
            }]
        }}>
            <View style={GalleryStyles.blurActions}>
                <View style={GalleryStyles.blurActions.actionItem.portrait}>
                    <IconMat name={ICONS.faceDetection} size={25} color={"#fff"}/>
                </View>

                {!isVisible && <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Remove blur on face"
                    accessibilityHint="Remove blur on face"
                    style={GalleryStyles.blurActions.item.portrait}
                    onPress={() => {
                        toggleBlur()
                    }}
                >
                    <IconMat name={ICONS.delete} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>}

                {isVisible && <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Save changes"
                    accessibilityHint="save changes and go back to main gallery"
                    style={GalleryStyles.blurActions.item.portrait}
                    onPress={saveChanges}
                >
                    <IconMat name={ICONS.commit} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>}

                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Stop editing"
                    accessibilityHint="Reset and go back"
                    style={GalleryStyles.blurActions.item.portrait}
                    onPress={cancelChanges}
                >
                    <IconMat name={ICONS.undo} size={54 / 1.4} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default EditFaceBlur;