import React from 'react';
import {Animated, Text, View} from 'react-native';
import {OrientationContext} from "../../contexts/orientationContext";
import {or} from "react-native-reanimated";

const ZoomProgress = ({zoom}) => {
    const {orientation} = React.useContext(OrientationContext);
    const [orientationName, setOrientationName] = React.useState('portrait');
    const [zoomHeight] = React.useState(new Animated.Value(0));

    const transforms = {
        portrait: [{
            translateY: zoomHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -200]
            }),
        }],
        landscape: [{
            translateX: zoomHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -200]
            }),
        }],
        landscapeLeft: [{
            translateX: zoomHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200]
            }),
        }]
    };

    React.useEffect(() => {
        Animated.timing(zoomHeight, {
            toValue: zoom,
            duration: 0,
            useNativeDriver: true
        }).start();
    }, [zoom]);

    React.useEffect(() => {
        const orienations = {
            '0': 'portrait',
            '-90': 'landscapeLeft',
            '90': 'landscape'
        };
        setOrientationName(orienations[orientation]);
    }, [orientation]);

    return (
        <View style={ZoomBarStyles.wrapper[orientationName]}>
            <Animated.View style={{
                ...ZoomBarStyles.progress[orientationName], transform: transforms[orientationName]
            }}/>
        </View>
    );
};

const ZoomBarStyles = {
    wrapper: {
        portrait: {
            backgroundColor: '#666',
            height: 200,
            width: 5,
            position: 'absolute',
            bottom: 20,
            left: 25,
            zIndex: 10,
            borderRadius: 50,
            overflow: 'hidden',
        },
        landscape: {
            backgroundColor: '#666',
            width: 200,
            height: 5,
            position: 'absolute',
            bottom: 25,
            left: 25,
            zIndex: 10,
            borderRadius: 50,
            overflow: 'hidden',
        },
        landscapeLeft: {
            backgroundColor: '#666',
            width: 200,
            height: 5,
            position: 'absolute',
            top: 75,
            left: 25,
            zIndex: 10,
            borderRadius: 50,
            overflow: 'hidden',
        }

    },
    progress: {
        portrait: {
            backgroundColor: '#b80769',
            width: 5,
            position: 'absolute',
            top: 200,
            height: 200,
            borderRadius: 50,
        },
        landscape: {
            backgroundColor: '#b80769',
            height: 5,
            position: 'absolute',
            left: 200,
            width: 200,
            borderRadius: 50,
        },
        landscapeLeft: {
            backgroundColor: '#b80769',
            height: 5,
            position: 'absolute',
            right: 200,
            width: 200,
            borderRadius: 50,
        }
    }
};

export default ZoomProgress;