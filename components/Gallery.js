import React from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
//import * as FileSystem from 'expo-file-system';
import GallerySwiper from "react-native-gallery-swiper";

import Actions from './Gallery/Actions';
import Images from "../utils/database";
import {ImageContext} from "../contexts/imageContext";

let pageSelected = 0;

const Gallery = () => {
    const {gallery} = React.useContext(ImageContext);
    const [activeImage, setActiveImage] = React.useState(false);
    //const [currentPage, setCurrentPage] = React.useState(0);
    //const [isEditing, setIsEditing] = React.useState(false);
    //const [images, setImages] = React.useState([]);

    const editEl = React.useRef(null);
    //
    // React.useEffect(() => {
    //     setImages(gallery);
    // }, []);
    //
    // React.useEffect(() => {
    //     setImages(gallery.map(addDynamicKeyToImage));
    // }, [isEditing]);

    // const addDynamicKeyToImage = (image) => {
    //     const length = gallery.length;
    //     image.key = `${image.id}#${isEditing}#${length}`;
    //     return image;
    // };

    const applyFaceData = () => {
        setActiveImage(gallery[pageSelected]);
        //copy to edit view
        //do face apply
        //screenshot
        //overwrite/replace file
        //update gallery
        //refresh gallery
        //update db
    }

    const GalleryImage = (props) => {
        return <Image {...props} resizeMethod={'resize'} />
    }

    const fullSizeImage = (props) => {
        const {uri, width, height} = gallery[pageSelected];
        return <Image source={{uri}} style={{width, height }} />;
    }

    if (!gallery.length) {
        return <Text>Loading...</Text>
    }

    if(activeImage) {
        return fullSizeImage()
    }

    return (
        <View style={{flex: 1 }}>
            <GallerySwiper
                images={gallery}
                imageComponent={GalleryImage}
                initialNumToRender={2}
                //initialPage={currentPage}
                enableResistance={false}
                enableScale={false}
                enableTranslate={false}
                pageMargin={5}
                sensitiveScroll={true}
                style={{flex: 1, backgroundColor: '#111'}}
                onPageSelected={(idx) => {
                    pageSelected = idx
                }}
            />
            <Actions applyFaceData={applyFaceData}/>
        </View>
    );
};

export default Gallery;