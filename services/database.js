import ImagesDB from '../utils/database';

const setGallery = () => {
    return ImagesDB.query({
        columns: '*',
        order: 'id DESC'
    });
};

const addImage = ({filename, id, uri, width, height}) => {
    const props = {
        name: filename,
        assetID: id,
        uri,
        width,
        height,
        processed: false
    };

    return ImagesDB.create(props);
}

const updateImage = async (asset) => {
    return ImagesDB.update(asset).then((res) => {
        return asset;
    });
}

const removeImage = async ({id}) => {
    return ImagesDB.destroy(id);
}

const saveImage = async ({asset}) => {
    asset.processed = true;
    return updateImage(asset);
};

const databaseActions = {
    SET_GALLERY: setGallery,
    ADD_IMAGE: addImage,
    UPDATE_IMAGE: updateImage,
    REMOVE_IMAGE: removeImage,
    SAVE_IMAGE: saveImage
}

export default databaseActions;

