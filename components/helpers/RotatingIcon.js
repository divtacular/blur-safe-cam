import React from 'react';
import {Animated, View} from 'react-native';

import CameraStyles from "../../styles/Camera";
import {OrientationContext} from "../../contexts/orientationContext";

const RotatingIcon = ({actionsAnimatedValue, children}) => {

    return (
        <View style={CameraStyles.bottomBarActions.animatedWrapper}>
            <Animated.View style={{
                ...CameraStyles.bottomBarActions.item, transform: [{
                    rotate: actionsAnimatedValue.interpolate({
                        inputRange: [0, 90, 270],
                        outputRange: ['0deg', '-90deg', '90deg']
                    }),
                }]
            }}>
                {children}
            </Animated.View>
        </View>
    );
};

export default React.memo(RotatingIcon);