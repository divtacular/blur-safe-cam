import ImagesDB from '../utils/database';

const setGallery = async (action) => {
    const value = await ImagesDB.query({
        columns: '*',
        order: 'id ASC',
        where: {
            id_gt: 14
        }
    });

    return value;

    // console.log('value', {
    //     type: action.type,
    //     value: value
    // })
    //
    // return {
    //     ...action,
    //     value
    // }
};


const databaseActions = {
    SET_GALLERY: setGallery
}

export default databaseActions;

