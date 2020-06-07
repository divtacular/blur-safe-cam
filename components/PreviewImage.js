import React, {useState} from 'react';
import {Modal, Text, TouchableHighlight, View, Image, StyleSheet} from 'react-native';
import {PIXI} from 'expo-pixi';
import * as FaceDetector from 'expo-face-detector';

import {getImageDimensions} from "../utils/helpers";

import {ImageContext} from "../contexts/imageContext";

const pictureSize = 520; //convert to % of window width, eh?

const PreviewImage = () => {
    const {imageState, showPreviewState} = React.useContext(ImageContext);
    const [faces, setFaces] = useState([]);

    const [image, setImage] = imageState;
    const [showPreview, setShowPreview] = showPreviewState;

    const dimensions = getImageDimensions(image);

    const detectFace = () => {
        FaceDetector.detectFacesAsync(image.uri, {
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
        })
            .then(facesDetected)
            .catch(handleFaceDetectionError);
    }

    const facesDetected = ({faces}) => {
        setFaces(faces)
    }

    const handleFaceDetectionError = error => console.warn(error);

    const renderFaces = () => image && faces && faces.map(renderFace);

    const renderFace = (face, index) => {
        const {scaleX, scaleY, offsetX, offsetY} = dimensions;
        const layout = {
            top: offsetY + face.bounds.origin.y * scaleY,
            left: offsetX + face.bounds.origin.x * scaleX,
            width: face.bounds.size.width * scaleX,
            height: face.bounds.size.height * scaleY,
        };

        return (
            <View
                key={index}
                style={[styles.face, layout]}
                transform={[
                    {perspective: 600},
                    {rotateZ: `${(face.rollAngle || 0).toFixed(0)}deg`},
                    {rotateY: `${(face.yawAngle || 0).toFixed(0)}deg`},
                ]}>
            </View>
        );
    }

    return (
        <View style={{marginTop: 22}}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={showPreview}
                onRequestClose={() => {
                }}>
                <Text>{dimensions.width} {dimensions.height}</Text>
                <View style={{margin: 10}}>
                    <TouchableHighlight
                        style={{...styles.pictureWrapper, ...{width: dimensions.width, height: dimensions.height}}}
                        onPress={detectFace}
                        activeOpacity={1}
                    >
                        <View>
                            <Image
                                style={{...styles.picture, ...{width: dimensions.width, height: dimensions.height}}}
                                source={{uri: image.uri}}
                            />
                            <View style={styles.facesContainer}>
                                {renderFaces()}
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight onPress={() => {
                        setImage(false);
                        setShowPreview(false);
                        setFaces([]);
                    }}>
                        <Text>Reset</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    picture: {
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'red'
    },
    pictureWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: 'blue'
        // margin: 5,
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .9)',
        borderRadius: 100
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 2,
        fontSize: 10,
        backgroundColor: 'transparent',
    }
});

export default PreviewImage;