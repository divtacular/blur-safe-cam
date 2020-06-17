import React from 'react';
import {View, TouchableHighlight, Image, TouchableOpacity} from "react-native";
import CameraStyles from "../../styles/Camera";

import {ImageContext} from "../../contexts/imageContext";
import {NavigationContext} from "@react-navigation/core";

const PreviewDot = ({gallery}) => {
    const navigation = React.useContext(NavigationContext);

    const [preview, setPreview] = React.useState({});

    React.useEffect(() => {
        setPreview(gallery[0]);
    }, [gallery]);

    const handlePress = () => {
        navigation.navigate('Gallery');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={CameraStyles.previewWrapper.button}>
            <Image source={{uri: preview.uri}} style={CameraStyles.previewWrapper.image}/>
        </TouchableOpacity>
    );
};

export default PreviewDot;