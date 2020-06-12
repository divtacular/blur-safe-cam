import React from 'react';
import {View, TouchableHighlight, Image, TouchableOpacity} from "react-native";
import CameraStyles from "../../styles/Camera";

import {ImageContext} from "../../contexts/imageContext";
import {NavigationContext} from "@react-navigation/core";

const PreviewDot = () => {
    const {previewState} = React.useContext(ImageContext);
    const navigation = React.useContext(NavigationContext);

    const [preview] = previewState;

    const showPreview = () => {
        navigation.navigate('Gallery')
    };

    return (
        <TouchableOpacity onPress={showPreview} style={CameraStyles.previewWrapper.button}>
            <Image source={{uri: preview.uri}} style={CameraStyles.previewWrapper.image}/>
        </TouchableOpacity>
    );
};

export default PreviewDot;