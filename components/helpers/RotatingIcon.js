import React from 'react';
import {Animated, View} from 'react-native';

import CameraStyles from "../../styles/Camera";
import {OrientationContext} from "../../contexts/orientationContext";

const RotatingIcon = (props) => {

    const {orientationValues} = React.useContext(OrientationContext);
    const [actionsAnimatedValue] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(actionsAnimatedValue, {
            toValue: orientationValues.rotation,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [orientationValues]);

    return (
        <View style={CameraStyles.bottomBarActions.iconWrapper}>
            <Animated.View style={{
                ...CameraStyles.bottomBarActions.animatedWrapper, transform: [{
                    rotate: actionsAnimatedValue.interpolate({
                        inputRange: [0, 90, 270],
                        outputRange: ['0deg', '-90deg', '90deg']
                    }),
                }]
            }}>
                {props.children}
            </Animated.View>
        </View>
    );
};

export default React.memo(RotatingIcon);