import React from 'react';
import {Image, View} from 'react-native';

const GalleryImage = (props) => {
    const {activeImage, croppedFaces} = props;

    return (
        <View key={props.image.assetID} style={{flex: 1, backgroundColor: '#444'}}>
            <Image {...props} />
        </View>
    );
};

export default GalleryImage;