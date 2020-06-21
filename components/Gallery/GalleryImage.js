import React from 'react';
import {ImageBackground, View, Text, Image, Dimensions, TouchableOpacity, PixelRatio} from 'react-native';
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {getAssetInfoAsync} from "expo-media-library";

import {constrainCropToImageDimensions, scaleAndPositionFaceBlurRelatively, scaledImageDimensionsInView} from './../../utils/helpers';

import BlurredFace from "./BlurredFace";

const GalleryImage = (props) => {
    const {activeImage, blurFaces, image} = props;
    const {uri, width, height, faceData} = activeImage;
    const [viewDimensions, setViewDimensions] = React.useState([]);
    const [croppedFaces, setCroppedFaces] = React.useState(null);

    React.useEffect(() => {
        if (blurFaces && activeImage.id === image.id) {
            cropFaces();
        }
    }, []);

    const cropFaces = async () => {
        const faceCoords = (faceData && JSON.parse(faceData)) || [];
        if (!faceCoords.length) {
            return;
        }
        const faces = [];
        for (let coord of faceCoords) {

            coord = constrainCropToImageDimensions(coord, {width, height});
            const crop = await manipulateAsync(
                uri,
                [{
                    crop: {
                        //TODO: constrain these values to the image
                        originX: coord.x,
                        originY: coord.y,
                        width: coord.width,
                        height: coord.height
                    }
                }],
                {compress: 1, format: SaveFormat.JPEG}
            )
                .catch((error) => {
                    return console.warn(error);
                })
            faces.push({...coord, ...crop});
        }
        setCroppedFaces(faces);
    };

    return (
        <View key={props.key} style={{flex: 1, backgroundColor: '#444'}} onLayout={(event) => {
            setViewDimensions({...event.nativeEvent.layout})
        }}>
            <ImageBackground {...props}>
                {blurFaces && croppedFaces && viewDimensions && croppedFaces.map((faceImage, i) => {
                    return <BlurredFace
                        activeImage={activeImage}
                        faceImage={faceImage}
                        index={i}
                        viewDimensions={viewDimensions}
                    />
                })}
            </ImageBackground>
        </View>
    );
};

export default React.memo(GalleryImage);