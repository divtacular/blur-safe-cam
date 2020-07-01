import React from 'react';
import {View} from 'react-native';

import BlurredFace from "./BlurredFaces/BlurredFace";
import EditFaceBlur from "./BlurredFaces/EditFaceBlur"

const BlurredFaces = ({activeImage, croppedFacesState, viewDimensions}) => {

    const [croppedFaces, setCroppedFaces] = croppedFacesState;

    return (
        <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
            {croppedFaces.map((faceImage, i) => {
                return <BlurredFace
                    index={i}
                    activeImage={activeImage}
                    faceImage={faceImage} //will pass isSelected and isHidden
                    viewDimensions={viewDimensions}
                    croppedFacesState={croppedFacesState}
                />
            })}
            <EditFaceBlur croppedFacesState={[croppedFaces, setCroppedFaces]} />
        </View>
    );
};

export default BlurredFaces;