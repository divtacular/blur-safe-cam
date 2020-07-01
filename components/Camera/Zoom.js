import React from 'react';
import {View} from 'react-native';

import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import CameraStyles from "../../styles/Camera";

//TODO: Add visual feedback for zoom level
const Zoom = ({children, setZoom}) => {

    const { travelTracker } = React.useMemo(() => ({
        travelTracker: {
            travelCap: 400,
            startY: 0,
            lastY: 0,
            travel: 0
        }
    }), [])

    const onPanHandlerStateChange = ({nativeEvent}) => {
        const curY = nativeEvent.y;
        if (nativeEvent.state === State.BEGAN || nativeEvent.state === State.END) {
            travelTracker.startY = curY;
            travelTracker.lastY = curY;
            travelTracker.travel = 0;
        }
    };

    const panHandlerEventProgress = ({nativeEvent}) => {
        const curY = nativeEvent.y;

        if (travelTracker.lastY >= curY) { //increase zoom
            travelTracker.travel = Math.min(travelTracker.travel + (travelTracker.lastY - curY), 200);
        } else { //decrease zoom
            travelTracker.travel = Math.max(travelTracker.travel - (curY - travelTracker.lastY), 0);
        }

        setZoom(travelTracker.travel / travelTracker.travelCap);
        travelTracker.lastY = curY;
    }

    return (
        <View style={CameraStyles.gestureWrapper}>
            <PanGestureHandler
                onGestureEvent={panHandlerEventProgress}
                onHandlerStateChange={onPanHandlerStateChange}
            >
                <Animated.View style={{flex: 1}}>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default React.memo(Zoom);