import ImagesDB from '../utils/database';

const setGallery = async () => {
    return await ImagesDB.query({
        columns: '*',
        order: 'id DESC'
    });
};

const addImage = async ({filename, id, uri, width, height}) => {
    const props = {
        name: filename,
        assetID: id,
        uri,
        width,
        height,
        processed: false
    };

    return await ImagesDB.create(props).catch(() => {
        console.log('DB add error!');
    });
}


const databaseActions = {
    SET_GALLERY: setGallery,
    ADD_IMAGE: addImage
}

export default databaseActions;

