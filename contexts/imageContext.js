import React, {createContext} from 'react';
import {detectFacesAsync, Constants} from "expo-face-detector";
import {deleteAssetsAsync, getAlbumAsync, removeAssetsFromAlbumAsync} from 'expo-media-library';

import * as MediaLibrary from 'expo-media-library';

import ImagesDB from "../utils/database";
import {ALBUM_NAME} from "../constants/app";

export const ImageContext = createContext();

const ImageContextProvider = (props) => {
    //Gallery =  [ { URI, name, FaceData, ProcessedFlag } ]
    const [gallery, setGallery] = React.useState([]);

    //Populate gallery
    //Gallery =  [ { URI, name, FaceData, ProcessedFlag } ]
    React.useEffect(() => {
        ImagesDB.query({
            columns: '*',
            order: 'id DESC'
        }).then((res) => {
            setGallery(res);
        })
    }, []);

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
    };

    const removeFromGallery = ({id, assetID}) => {
        MediaLibrary.getAlbumsAsync().then((res) => {
            console.log(res);
        })
        setGallery((prevProps) => {
            return prevProps.filter((image) => {
                return image.id !== id;
            })
        });
        ImagesDB.destroy(id);

        getAlbumAsync(ALBUM_NAME).then(({id}) => {

            console.log(assetID.toString());
            console.log(id);

            removeAssetsFromAlbumAsync([assetID.toString()], id.toString()).then(
                ( res ) => {
                    deleteAssetsAsync([assetID.toString()]).then((res) => {
                        console.log(res);
                    });
                }
            );
        });
    };

    //TODO: Memoise this expensive operation. Move this.
    const setFaceData = (asset) => {

        console.log('FACE DETECT CALLED');

        if (!asset) {
            return;
        }

        detectFacesAsync(asset.uri, {
            mode: Constants.Mode.accurate,
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
                console.log('FACE DETECT SAVED');
                updateGallery(props);
            });
        });
    };

    return (
        <ImageContext.Provider value={{gallery, setFaceData, addToGallery, removeFromGallery}}>
            {props.children}
        </ImageContext.Provider>
    );
}

export default ImageContextProvider;