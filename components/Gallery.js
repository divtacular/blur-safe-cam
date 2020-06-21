import React from 'react';
import {View, Text, Vibration} from 'react-native';
import {getAssetInfoAsync} from "expo-media-library";

import GallerySwiper from "react-native-gallery-swiper";

import {ImageContext} from "../contexts/imageContext";
import Actions from './Gallery/Actions';
import GalleryImage from "./Gallery/GalleryImage";
//import Images from "../utils/database";

let activeSlide = null;

const Gallery = () => {
    const {gallery} = React.useContext(ImageContext);
    const [images, setImages] = React.useState([]);
    const [activeImage, setActiveImage] = React.useState({});
    const [blurFaces, setBlurFaces] = React.useState(false);
    const [longTapPost, setLongTapPos] = React.useState([]);

    React.useEffect(() => {
        gallery.length && setImages(gallery.map(addDynamicKeyToImage));
        //update active slide data
        if (activeSlide !== null) {
            setActiveImage(gallery[activeSlide]);
        }
    }, [gallery]);

    React.useEffect(() => {
        gallery.length && setImages(gallery.map(addDynamicKeyToImage));
    }, [blurFaces]);

    const addDynamicKeyToImage = (image) => {
        const showFaces = blurFaces && activeImage.id === image.id ? 1 : 0;
        //const hasFaceData = Object.keys(image).includes('faceData') ? 1 : 0;
        image.key = `${image.id}#${showFaces}`;
        return image;
    };

    const applyFaceData = () => {
        setBlurFaces(true);
    }

    const GalleryImageRenderer = (props) => {
        return <GalleryImage blurFaces={blurFaces} activeImage={activeImage} {...props} />
    }

    if (!images.length) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={{flex: 1}}>
            <GallerySwiper
                images={images}
                imageComponent={GalleryImageRenderer}
                initialNumToRender={2}
                //initialPage={currentPage}
                enableResistance={false}
                enableScale={false}
                enableTranslate={false}
                pageMargin={5}
                sensitiveScroll={true}
                style={{flex: 1, backgroundColor: '#111'}}
                onPageSelected={(idx) => {
                    activeSlide = idx;
                    setActiveImage(gallery[idx])
                }}
                onLongPress={({x0, y0}) => {
                    Vibration.vibrate(30);
                    setLongTapPos([
                        x0, y0
                    ])
                }}
            />
            <Actions applyFaceData={applyFaceData}
                     blurredFacesState={[blurFaces, setBlurFaces]}
                     activeImage={activeImage}
            />
        </View>
    );
};

export default Gallery;