import React from 'react';
import {Image, View} from 'react-native';

const GalleryImage = ({image}) => {

    if(!image) {
        return <></>;
    }

    return (
        <View style={{flex: 1, backgroundColor: '#444'}} key={image.id}>
            <Image source={{uri: image.uri}}
                   style={{flex: 1, resizeMode: 'contain'}}
            />
        </View>
    );
};

export default GalleryImage;