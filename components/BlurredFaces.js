import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import BlurredFace from "./BlurredFaces/BlurredFace";
import EditFaceBlur from "./BlurredFaces/EditFaceBlur"

const BlurredFaces = ({activeImage, croppedFacesState, viewDimensions}) => {

    const [croppedFaces, setCroppedFaces] = croppedFacesState;

    return (
        <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
            {croppedFaces.map((faceImage, i) => {
                return <BlurredFace
                    activeImage={activeImage}
                    croppedFacesState={croppedFacesState}
                    faceImage={faceImage}
                    index={i}
                    viewDimensions={viewDimensions}
                />
            })}
            <EditFaceBlur croppedFacesState={[croppedFaces, setCroppedFaces]} />
        </View>
    );
};

export default BlurredFaces;