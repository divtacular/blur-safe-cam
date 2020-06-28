import React from 'react';
import {Animated, Image, TouchableHighlight, View} from "react-native";

import {scaleAndPositionFaceBlurRelatively} from "../../utils/helpers";

const BlurredFace = ({activeImage, faceImage, index, viewDimensions, isSelected, setIsSelected}) => {

    //console.log(faceImage.isHidden);
    const [visible, setVisibility] = React.useState(true);
    const [animatedValue] = React.useState(new Animated.Value(faceImage.isHidden ? 1 : 0)); //inverse, from Val

    const originalImageDimensions = {
        orgWidth: activeImage.width,
        orgHeight: activeImage.height
    };

    const {offsetTop, offsetLeft, height, width} = scaleAndPositionFaceBlurRelatively({
        originalImageDimensions,
        viewDimensions,
        faceImage
    });

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: faceImage.isHidden ? 0 : 1,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setVisibility(faceImage.isHidden);
        });
    }, []);

    return (
        <Animated.View style={{
            top: offsetTop,
            left: offsetLeft,
            height: height,
            width: width,
            position: 'absolute',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 150,//15,
            borderBottomRightRadius: 150,//15,
            opacity: isSelected ? animatedValue : faceImage.isHidden ? 0 : 1
        }}>
            <TouchableHighlight style={{
                height: height,
                width: width,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 150,//15,
                borderBottomRightRadius: 150,//15,
            }}
                                onPress={() => {
                                    setIsSelected(index);
                                }}>
                <Image
                    blurRadius={15}
                    key={index}
                    source={{uri: faceImage.uri}}
                    style={{
                        height: height,
                        width: width,
                        borderRadius: 100,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 150,//15,
                        borderBottomRightRadius: 150,//15,
                        borderWidth: isSelected ? 1 : 0,
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