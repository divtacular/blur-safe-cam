import React from 'react';
import {ImageBackground, View} from 'react-native';

import BlurredFace from "./BlurredFace";

const GalleryImage = (props) => {
    const {activeImage, croppedFaces} = props;
    const [viewDimensions, setViewDimensions] = React.useState(false);

    return (
        <View key={props.image.assetID} style={{flex: 1, backgroundColor: '#444'}} onLayout={(event) => {
            setViewDimensions({...event.nativeEvent.layout})
        }}>
            <ImageBackground {...props}>

                {viewDimensions && croppedFaces && croppedFaces.map((faceImage, i) => {
                    return <BlurredFace
                        activeImage={activeImage}
                        faceImage={faceImage}
                        index={i}
                        viewDimensions={viewDimensions}
                    />
                })
                }
            </ImageBackground>
        </View>
    );
};

export default React.memo(GalleryImage);