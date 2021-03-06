import React from 'react';
import {Animated, Image, TouchableHighlight} from "react-native";

import {scaleAndPositionFaceBlurRelatively} from "../../utils/helpers";

const BlurredFace = ({activeImage, croppedFacesState, faceImage, index, viewDimensions}) => {
    const [croppedFaces, setCroppedFaces] = croppedFacesState;
    const [removeFromFlow, setRemoveFromFlow] = React.useState(false)
    const [animatedValue] = React.useState(new Animated.Value(faceImage.isHidden ? 1 : 0)); //inverse, from Val

    const [positioning, setPositioning] = React.useState({});

    React.useEffect(() => {
        const originalImageDimensions = {
            orgWidth: activeImage.width,
            orgHeight: activeImage.height
        };

        setPositioning(scaleAndPositionFaceBlurRelatively({
            originalImageDimensions,
            viewDimensions,
            faceImage
        }));

    }, [croppedFaces])

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: faceImage.isHidden ? 0 : 1,
            duration: 150,
            useNativeDriver: true
        }).start(() => {
            setRemoveFromFlow(faceImage.isHidden);
        });
    }, [croppedFaces]);

    const setIsSelected = () => {
        setCroppedFaces(croppedFaces.map((face, i) => {
            face.isSelected = i === index;
            return face;
        }));
    };

    return (
        !removeFromFlow && <Animated.View style={{
            top: positioning.offsetTop,
            left: positioning.offsetLeft,
            height: positioning.height,
            width: positioning.width,
            position: 'absolute',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: positioning.borderLeft,//15,
            borderBottomRightRadius: positioning.borderRight,//15,
            opacity: faceImage.isSelected ? animatedValue : faceImage.isHidden ? 0 : 1
        }}>
            <TouchableHighlight
                onPress={setIsSelected}
                style={{
                    height: positioning.height,
                    width: positioning.width,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 150,//15,
                    borderBottomRightRadius: 150,//15,
                }}
            >
                <Image
                    blurRadius={15}
                    key={index}
                    source={{uri: faceImage.uri}}
                    style={{
                        height: positioning.height,
                        width: positioning.width,
                        borderRadius: 100,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 150,//15,
                        borderBottomRightRadius: 150,//15,
                        borderWidth: faceImage.isSelected ? 1 : 0,
                        borderColor: '#ff8a63'
                    }}
                    transform={[
                        {perspective: 600},
                        {rotateZ: `${(faceImage.rollAngle || 0).toFixed(0)}deg`},
                        {rotateY: `${(faceImage.yawAngle || 0).toFixed(0)}deg`},
                    ]}
                    // onLoad={() => {
                    //     setDrawnFaces(prevState => {
                    //         return prevState + 1;
                    //     });
                    // }}
                />
            </TouchableHighlight>
        </Animated.View>
    );
};

export default React.memo(BlurredFace);