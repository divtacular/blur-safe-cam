import React from 'react';
import {View, TouchableHighlight, Image, TouchableOpacity} from "react-native";
import {NavigationContext} from "@react-navigation/core";

import CameraStyles from "../../styles/Camera";

const PreviewDot = ({preview}) => {
    const {navigate} = React.useContext(NavigationContext);

    const handlePress = () => {

        navigate('Gallery');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={CameraStyles.previewWrapper.button}>
            <Image source={{uri: preview.uri}} style={CameraStyles.previewWrapper.image}/>
        </TouchableOpacity>
    );
};

export default React.memo(PreviewDot);