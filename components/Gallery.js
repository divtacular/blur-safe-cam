// @refresh reset
import React from 'react';
import {View, Text} from 'react-native'
import GallerySwiper from "react-native-gallery-swiper";

import {NavigationContext} from "@react-navigation/core";
import {StoreContext} from "../store/StoreContext";
import {GalleryContext} from "../contexts/galleryContext";

import Actions from './Gallery/Actions';
import BlurredFace from "./Gallery/BlurredFace";
import GalleryImage from "./Gallery/GalleryImage";
import EditFaceBlur from "./Gallery/EditFaceBlur";

import {cropFaces} from "../utils/helpers";

let activeSlide = false;

const Gallery = () => {
    const {reducerActions} = React.useContext(StoreContext);
    const {gallery} = React.useContext(GalleryContext);
    const {navigate} = React.useContext(NavigationContext);

    const [images, setImages] = React.useState(gallery);
    const [activeBlur, setActiveBlur] = React.useState(false);
    const [activeImage, setActiveImage] = React.useState([]);
    const [croppedFaces, setCroppedFaces] = React.useState([]);
    const [viewDimensions, setViewDimensions] = React.useState(null);

    React.useEffect(() => {
        gallery.length && setImages(gallery);
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

    const BlurredFacesRenderer = () => {
        return (<View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
            {croppedFaces.map((faceImage, i) => {
                return <BlurredFace
                    activeImage={activeImage}
                    faceImage={faceImage}
                    index={i}
                    viewDimensions={viewDimensions}
                    isSelected={activeBlur === i}
                    setIsSelected={setActiveBlur}
                    // isSelected={faceImage.isSelected}
                />
            })}
        </View>);
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
                    activeSlide = idx;
                    setActiveImage(gallery[idx]);
                }}
            />

            {viewDimensions && !!croppedFaces.length && <BlurredFacesRenderer/>}

            <Actions activeBlur={{activeBlur}}
                     activeImage={activeImage}
                     isShowingBlurredFaces={croppedFaces.length}
                     actions={{
                         blurFaces, deleteImage, saveImage, resetImage
                     }}/>

            {activeBlur !== false && <EditFaceBlur activeBlurState={[activeBlur, setActiveBlur]}
                                                   croppedFacesState={[croppedFaces, setCroppedFaces]}
            />}
        </View>
    );
};

export default Gallery;