import React, {createContext} from 'react';
import {detectFacesAsync, Constants} from "expo-face-detector";

import ImagesDB from "../utils/database";

export const ImageContext = createContext();

const ImageContextProvider = (props) => {
    //Gallery =  [ { URI, name, FaceData, ProcessedFlag } ]
    const [gallery, setGallery] = React.useState([]);

    // const setValueForGalleryImageByName = (imageName, {key, value}) => {
    //     const galleryImage = gallery.filter((image) => {
    //         return image.imageName === imageName;
    //     }).map((match) => {
    //         match[key] = value;
    //     });
    //
    //     setGallery({
    //         ...gallery,
    //         galleryImage
    //     });
    // };

    const addToGallery = (image) => {
        setGallery([
            image,
            ...gallery
        ]);
    };

    const updateGallery = (updated) => {
        setGallery((prevProps) => {
            return prevProps.map((image) => {
                if (image.id === updated.id) {
                    return {
                        ...image,
                        ...updated
                    };
                }
                return image;
            });
        });
    }

    //TODO: Memoise this expensive operation
    const setFaceData = (asset) => {
        if (!asset) {
            return;
        }
        detectFacesAsync(asset.uri, {
            mode: Constants.Mode.fast,
            detectLandmarks: Constants.Landmarks.none,
            runClassifications: Constants.Classifications.none,
            minDetectionInterval: 100
        }).then(({faces}) => {
            if (faces.length) {
                faces = faces.map((face) => {
                    return ({
                        x: face.bounds.origin.x,
                        y: face.bounds.origin.y,
                        height: face.bounds.size.height,
                        width: face.bounds.size.width,
                        rollAngle: face.rollAngle,
                        yawAngle: face.yawAngle
                    });
                });
            }

            const props = {
                id: asset.id,
                faceData: JSON.stringify(faces)
            };
            ImagesDB.update(props).then(() => {
                updateGallery(props);
            });
        });
    };

    //Populate gallery
    //Gallery =  [ { URI, name, FaceData, ProcessedFlag } ]
    React.useEffect(() => {
        ImagesDB.query({
            columns: 'id, name, uri, processed, faceData, width, height',
            order: 'id DESC'
        }).then((res) => {
            setGallery(res);
        })
    }, []);


    return (
        <ImageContext.Provider value={{gallery, addToGallery, setFaceData}}>
            {props.children}
        </ImageContext.Provider>
    );
}

export default ImageContextProvider;