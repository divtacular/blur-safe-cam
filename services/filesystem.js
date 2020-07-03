import {createAssetAsync, createAlbumAsync, deleteAssetsAsync} from "expo-media-library";
import {ALBUM_NAME} from "../constants/app";

const addImage = async ({uri}) => {
    return await createAssetAsync(uri);
};

const removeImage = async ({assetID}) => {
    return await deleteAssetsAsync([assetID.toString()]);
};

const saveImage = async ({uri}) => {
    //receive a new image with the blur rendered.
    createAssetAsync(uri).then((asset) => {
        createAlbumAsync(ALBUM_NAME, asset, true);
    });
};

const filesystemActions = {
    ADD_IMAGE: addImage,
    REMOVE_IMAGE: removeImage,
    SAVE_IMAGE: saveImage
};

export default filesystemActions;

