// @refresh reset
import React from 'react';
import {View, Text, Vibration, TouchableOpacity} from 'react-native'
import GallerySwiper from "react-native-gallery-swiper";

import {NavigationContext} from "@react-navigation/core";
import {StoreContext} from "../store/StoreContext";
import {GalleryContext} from "../contexts/galleryContext";

import Actions from './Gallery/Actions';
import GalleryImage from "./Gallery/GalleryImage";
import EditFaceBlur from "./Gallery/EditFaceBlur";

import {
    createRefKeyForImage,
    cropFaces,
    mapLongPressToBlurredFace
} from "../utils/helpers";

let activeSlide = false;

const Gallery = () => {
    const {reducerActions} = React.useContext(StoreContext);
    const {gallery} = React.useContext(GalleryContext);
    const {navigate} = React.useContext(NavigationContext);

    const [images, setImages] = React.useState(gallery);
    const [activeImage, setActiveImage] = React.useState([]);
    const [croppedFaces, setCroppedFaces] = React.useState([]);
    const [isModifyBlur, setIsModifyBlur] = React.useState({isModifying: false});
    const [viewDimensions, setViewDimensions] = React.useState(null);

    React.useEffect(() => {
        gallery.length && setImages(gallery);
        //gallery.length && setImages(gallery.map(addDynamicKeyToImage));

        //update active slide data
        if (activeSlide !== false) {
            //refresh view of active image with facedata if required.
            setActiveImage(gallery[activeSlide]);
        }
    }, [gallery]);

    React.useEffect(() => {
        if (!gallery.length) {
            navigate('Camera');
        }
    }, [gallery])

    React.useEffect(() => {
        //Refresh key on gallery slide to trigger rerender
        //cropped faces existence means blurred images are showing on a slide.
        if (gallery.length) {
            const isCropImage = !!croppedFaces.length;

            const newImages = gallery.map((image, i) => {
                const activeID = activeImage.id;
                image.key = createRefKeyForImage(image, activeID, isCropImage, isModifyBlur);
                return image;
            });
            //console.log(newImages);
            setImages(newImages);
        }
    }, [croppedFaces]);

    //Force key change and rerender to the gallery when a blur is toggled active.
    React.useEffect(() => {
        const newFaces = (croppedFaces.map((face, i) => {
            face.isSelected = isModifyBlur.modifyIndex === i;
            return face;
        }));
        setCroppedFaces(newFaces);
    }, [isModifyBlur]);

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
        //full screen, use hidden view
        //apply faces
        //captureref
    };

    const resetImage = () => {
        setCroppedFaces([]);
        resetModifyingBlur();
    };

    const resetModifyingBlur = () => {
        setIsModifyBlur({
            isModifying: false
        });
    }

    const handleGalleryLongPress = (tapCoords) => {
        const originalImageDimensions = {
            orgWidth: activeImage.width,
            orgHeight: activeImage.height
        };
        setIsModifyBlur(mapLongPressToBlurredFace({tapCoords, originalImageDimensions, viewDimensions, croppedFaces}));
    };

    const GalleryImageRenderer = (props) => {
        //console.log('rerender');
        return <GalleryImage activeImage={activeImage} croppedFaces={croppedFaces} {...props} />
    }

    //TODO: Componenet needed for awaiting data
    if (!images.length) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={{flex: 1, position: 'relative'}} onLayout={(event) => {
            setViewDimensions({...event.nativeEvent.layout});
        }}>
            <EditFaceBlur />
            <GallerySwiper
                images={images}
                imageComponent={GalleryImageRenderer}
                initialNumToRender={2}
                enableResistance={true}
                enableScale={false}
                enableTranslate={false}
                pageMargin={0}
                sensitiveScroll={true}
                style={{flex: 1, backgroundColor: '#111'}}
                onPageSelected={(idx) => {
                    activeSlide = idx;
                    setActiveImage(gallery[idx]);
                    setCroppedFaces(false);
                }}
                onPageScroll={() => {
                }}
                onLongPress={({x0, y0}) => {
                    if (croppedFaces && croppedFaces.length) {
                        Vibration.vibrate(30);
                        handleGalleryLongPress({
                            x: x0, y: y0
                        })
                    }
                }}
            />
            {activeImage && <Actions activeImage={activeImage}
                                     isShowingBlurredFaces={croppedFaces.length}
                                     isEditingBlurredFaces={isModifyBlur}
                                     actions={{
                                         blurFaces, deleteImage, saveImage, resetImage
                                     }}/>}
        </View>
    );
};

export default Gallery;