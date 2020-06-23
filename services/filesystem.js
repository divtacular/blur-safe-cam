import {createAssetAsync} from "expo-media-library";

const addImage = async ({uri}) => {
    return await createAssetAsync(uri);
        //const asset = await createAssetAsync(photo.uri);
        //Move asset to album, can't create empty album on Android
        // //"-280988523"
        // console.log('- - - - - - -');
// console.log(asset)
        // await createAlbumAsync(ALBUM_NAME, asset, true)
        //     .then(({id}) => {
        //         MediaLibrary.getAssetsAsync({
        //             album: id
        //         }).then(({assets}) => {
        //             //console.log(assets[assets.length -1]);
        //             assets.forEach((a) => {
        //                 if(a.filename === asset.filename) {
        //                     console.log(a);
        //                 }
        //             })
        //             console.log('- - - - - - -');
        //         });
        //     })
        //     .catch(error => console.warn(error.message));
        //
        // photo.assetID = asset.id;
        // return photo;
};

const filesystemActions = {
    ADD_IMAGE: addImage
}

export default filesystemActions;

