import React from 'react';
import {View} from 'react-native';

import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import ZoomProgress from "./ZoomProgress";

import CameraStyles from "../../styles/Camera";
import {OrientationContext} from "../../contexts/orientationContext";

//TODO: Add visual feedback for zoom level
const Zoom = ({children, zoom, setZoom, zoomActiveState}) => {

    const {orientation} = React.useContext(OrientationContext);
    const [isZooming, setIsZooming] = zoomActiveState;
    const [direction, setDirection] = React.useState('y');
    const {travelTracker} = React.useMemo(() => ({
        travelTracker: {
            travelCap: 200,
            start: 0,
            last: 0,
            travel: 0
        }
    }), [])

    React.useEffect(() => {
        if (isZooming) {
            return;
        }
        //reset zoom too?
        setDirection(orientation === 0 ? 'y' : 'x');
    }, [orientation]);

    const onPanHandlerStateChange = ({nativeEvent}) => {
        const cur = nativeEvent[direction];
        if (nativeEvent.state === State.BEGAN) {
            setIsZooming(true);
        }

        if (nativeEvent.state === State.END) {
            setIsZooming(false);
        }
    };

    const panHandlerEventProgress = ({nativeEvent}) => {
        const cur = nativeEvent[direction];

        if (orientation === -90) {
            if (travelTracker.last >= cur) { //increase zoom
                travelTracker.travel = Math.min(travelTracker.travel - (travelTracker.last - cur), 200);
            } else { //decrease zoom
                travelTracker.travel = Math.max(travelTracker.travel + (cur - travelTracker.last), 0);
            }
        } else {
            if (travelTracker.last >= cur) { //increase zoom
                travelTracker.travel = Math.min(travelTracker.travel + (travelTracker.last - cur), 200);
            } else { //decrease zoom
                travelTracker.travel = Math.max(travelTracker.travel - (cur - travelTracker.last), 0);
            }
        }
        setZoom(travelTracker.travel / travelTracker.travelCap);
        travelTracker.last = cur;
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
            {isZooming && <ZoomProgress zoom={zoom}/>}
        </View>
    );
};

export default React.memo(Zoom);