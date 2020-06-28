// @refresh reset
import React from 'react';
import {View, Text} from 'react-native'
import GallerySwiper from "react-native-gallery-swiper";

import {NavigationContext} from "@react-navigation/core";
import {StoreContext} from "../store/StoreContext";
import {GalleryContext} from "../contexts/galleryContext";

import Actions from './Gallery/Actions';
import GalleryImage from "./Gallery/GalleryImage";
import BlurredFaces from "./BlurredFaces";

import {cropFaces} from "../utils/helpers";
import BlurredFace from "./BlurredFaces/BlurredFace";

const Gallery = () => {
    const {reducerActions} = React.useContext(StoreContext);
    const {gallery} = React.useContext(GalleryContext);
    const {navigate} = React.useContext(NavigationContext);

    const croppedFacesState = React.useState([]);

    const [images, setImages] = React.useState(gallery);
    const [croppedFaces, setCroppedFaces] = croppedFacesState;
    const [activeImage, setActiveImage] = React.useState(false);
    const [viewDimensions, setViewDimensions] = React.useState(null);

    React.useEffect(() => {
        if (!gallery.length) {
            navigate('Camera');
        }
        setImages(gallery);
        //update active slide data
        if (activeImage) {
            //refresh view of active image with facedata if required.
            setActiveImage(gallery.filter((image) => {
                return image.id === activeImage.id
            }));
        }
    }, [gallery]);

    const blurFaces = async () => {
        if (activeImage.faceData && JSON.parse(activeImage.faceData).length) {
            setCroppedFaces(await cropFaces(activeImage));
        }
    };

    const deleteImage = () => {
        reducerActions.removeImage(activeImage);
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
                    setActiveImage(gallery[idx]);
                }}
            />

            {!!croppedFaces.length && <BlurredFaces activeImage={activeImage}
                                                    croppedFacesState={croppedFacesState}
                                                    viewDimensions={viewDimensions}
            />}

            <Actions activeImage={activeImage}
                     actions={{blurFaces, deleteImage, saveImage, resetImage}}
            />
        </View>
    );
};

export default Gallery;