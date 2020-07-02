// @refresh reset
import React from 'react';
import {View, Text} from 'react-native'
import GallerySwiper from "react-native-gallery-swiper";
import {
    lockAsync,
    OrientationLock,
    addOrientationChangeListener
} from 'expo-screen-orientation';

import {NavigationContext} from "@react-navigation/core";
import {StoreContext} from "../store/StoreContext";
import {GalleryContext} from "../contexts/galleryContext";

import Actions from './Gallery/Actions';
import GalleryImage from "./Gallery/GalleryImage";
import BlurredFaces from "./BlurredFaces";

import {cropFaces} from "../utils/helpers";

let activeSlide = 0;

const Gallery = ({navigation}) => {
    const {gallery} = React.useContext(GalleryContext);
    const {navigate} = React.useContext(NavigationContext);
    const {reducerActions} = React.useContext(StoreContext);

    const croppedFacesState = React.useState([]);
    const [croppedFaces, setCroppedFaces] = croppedFacesState;
    const [images, setImages] = React.useState(gallery);
    const [isBlurring, setIsBlurring] = React.useState(false);
    const [activeImage, setActiveImage] = React.useState(false);
    const [viewDimensions, setViewDimensions] = React.useState(null);

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            lockAsync(OrientationLock.ALL);
        });

        navigation.addListener('blur', () => {
            lockAsync(OrientationLock.PORTRAIT)
        });

        addOrientationChangeListener((e) => {
            setCroppedFaces([]);
        });
    }, [navigation]);

    React.useEffect(() => {
        if (!gallery.length) {
            navigate('Camera');
        }
        setImages(gallery.map((image) => {
            return {
                ...image,
                key: image.id
            }
        }));
    }, [gallery]);

    //refresh view of active image after gallery updates.
    React.useEffect(() => {
        setActiveImage(gallery[activeSlide]);
    }, [gallery]);

    const blurFaces = () => {
        if (activeImage.faceData && JSON.parse(activeImage.faceData).length) {
            setIsBlurring(true);
            const checkSlide = activeSlide.valueOf();
            cropFaces(activeImage).then((faceData) => {
                if (checkSlide === activeSlide) {
                    setCroppedFaces(faceData);
                }
                setIsBlurring(false);
            })
        }
    };

    const saveImage = () => {
        console.log('save image');
        //check for hidden blurs? Could just leave them hidden.
        //full screen, use hidden view
        //apply faces
        //captureref
    };

    const resetImage = () => {
        setCroppedFaces([]);
    };

    const deleteImage = () => {
        reducerActions.removeImage(gallery[activeSlide]);
    };

    const GalleryImageRenderer = (props) => {
        return <GalleryImage activeImage={activeImage} croppedFaces={croppedFaces} {...props} />
    }

    //TODO: component needed for awaiting data
    if (!images.length) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={{flex: 1, position: 'relative'}} onLayout={(event) => {
            setViewDimensions({...event.nativeEvent.layout});
        }}>
            <GallerySwiper
                images={images}
                imageComponent={GalleryImageRenderer}
                initialNumToRender={2}
                enableResistance={false}
                enableScale={false}
                enableTranslate={false}
                pageMargin={0}
                sensitiveScroll={true}
                style={{flex: 1, backgroundColor: '#111'}}
                onPageSelected={(idx) => {
                    setCroppedFaces([]);
                    setActiveImage(gallery[idx]);
                    activeSlide = idx;
                }}
            />

            {!!croppedFaces.length && <BlurredFaces activeImage={activeImage}
                                                    croppedFacesState={croppedFacesState}
                                                    viewDimensions={viewDimensions}
            />}

            <Actions actions={{blurFaces, deleteImage, saveImage, resetImage}}
                     activeImage={activeImage}
                     isBlurring={isBlurring}
                     croppedFacesState={croppedFacesState}
            />
        </View>
    );
};

export default Gallery;