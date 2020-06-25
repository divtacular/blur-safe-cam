import React from 'react';
import {View, Text, Vibration} from 'react-native'
import GallerySwiper from "react-native-gallery-swiper";

import {GalleryContext} from "../contexts/galleryContext";

import Actions from './Gallery/Actions';
import GalleryImage from "./Gallery/GalleryImage";
import {createRefKeyForImage, cropFaces} from "../utils/helpers";

let activeSlide = false;

const Gallery = () => {
    const {gallery} = React.useContext(GalleryContext);
    const [images, setImages] = React.useState(gallery);
    const [activeImage, setActiveImage] = React.useState([]);
    const [croppedFaces, setCroppedFaces] = React.useState([]);

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
        //Refresh key on gallery slide to trigger rerender
        //cropped faces existence means blurred images are showing on a slide.
        if (gallery.length) {
            const isCropImage = !!croppedFaces.length;

            const newImages = gallery.map((image, i) => {
                const activeID = activeImage.id;
                image.key = createRefKeyForImage(image, activeID, isCropImage);
                return image;
            });
            setImages(newImages);
        }
    }, [croppedFaces]);

    const blurFaces = async () => {

        if (activeImage.faceData && JSON.parse(activeImage.faceData).length) {
            setCroppedFaces(await cropFaces(activeImage));
        }
    };
    const deleteImage = () => {
        console.log('delete image');
    };
    const saveImage = () => {
        console.log('save image');
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

    //TODO: Componenet needed for awaiting data
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
                    // setLongTapPos([
                    //     x0, y0
                    // ]);
                }}
            />
            {activeImage && <Actions activeImage={activeImage}
                                     isShowingBlurredFaces={croppedFaces.length}
                                     actions={{
                                         blurFaces, deleteImage, saveImage, resetImage
                                     }}/>}
        </View>
    );
};

export default Gallery;