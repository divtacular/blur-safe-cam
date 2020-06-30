import React from 'react';
import {Animated, Image, TouchableOpacity, View} from "react-native";
import {NavigationContext} from "@react-navigation/core";

import {OrientationContext} from "../../contexts/orientationContext";

import CameraStyles from "../../styles/Camera";

const PreviewDot = ({preview}) => {
    const {navigate} = React.useContext(NavigationContext);

    const {orientation} = React.useContext(OrientationContext);
    const [actionsAnimatedValue] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(actionsAnimatedValue, {
            toValue: orientation,
            duration: 225,
            useNativeDriver: true
        }).start();
    }, [orientation]);

    const handlePress = () => {
        navigate('Gallery');
    };

    return (
        <Animated.View style={{transform: [{
                rotate: actionsAnimatedValue.interpolate({
                    inputRange: [0, 90, 270],
                    outputRange: ['0deg', '-90deg', '90deg']
                }),
            }]
        }}>
            <TouchableOpacity onPress={handlePress} style={CameraStyles.previewWrapper.button}>
                <Image source={{uri: preview.uri}} style={CameraStyles.previewWrapper.image}/>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default React.memo(PreviewDot);