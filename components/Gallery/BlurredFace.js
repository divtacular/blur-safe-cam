import React from 'react';
import {Image} from "react-native";

import {scaleAndPositionFaceBlurRelatively} from "../../utils/helpers";

const BlurredFace = ({activeImage, faceImage, index, viewDimensions}) => {
        const originalImageDimensions = {
            orgWidth: activeImage.width,
            orgHeight: activeImage.height
        };

        const {offsetTop, offsetLeft, height, width} = scaleAndPositionFaceBlurRelatively({
            originalImageDimensions,
            viewDimensions,
            faceImage
        });

        return (
            <Image
                blurRadius={15}
                key={index}
                source={{uri: faceImage.uri}}
                style={{
                    top: offsetTop,
                    left: offsetLeft,
                    height: height,
                    width: width,
                    position: 'absolute',
                    borderRadius: 100,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    borderWidth: 1,
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
        );
    };

    export default BlurredFace;