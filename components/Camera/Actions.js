import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";
import {MaterialCommunityIcons as IconMat} from '@expo/vector-icons';

import {StoreContext} from "../../store/StoreContext";
import {PermissionsContext} from "../../contexts/permissionsContext";

import CameraStyles from "../../styles/Camera";
import {ICONS, FLASH_ORDER} from "../../constants/camera";

const iconSize = CameraStyles.bottomBarActions.icons.fontSize;

const Actions = ({cameraRef, actions}) => {
    const {gallery, reducerActions} = React.useContext(StoreContext);
    const {mediaLibraryPermission} = React.useContext(PermissionsContext);

    const [flash, setFlash] = actions.flashState;
    const [cameraSource, setCameraSource] = actions.cameraSourceState;

    const [icons, setIcons] = React.useState({});

    React.useEffect(() => {
        const cameraSourceIconName = Camera.Constants.Type.front === cameraSource ? 'front' : 'rear';
        setIcons({
            flash: ICONS.FLASH_ICONS[flash],
            camera: ICONS.CAMERA_SOURCE_ICONS[cameraSourceIconName]
        });
    }, [flash, cameraSource]);

    const toggleCameraSource = () => {
        setCameraSource(
            cameraSource === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
        );
    };

    const toggleFlash = () => {
        const keys = Object.keys(FLASH_ORDER);
        const index = keys.indexOf(flash);
        const newIndex = (index === keys.length - 1 ? 0 : index + 1);

        setFlash(FLASH_ORDER[keys[newIndex]]);
    };

    const takePicture = () => {
        if (cameraRef) {
            cameraRef.current.takePictureAsync().then((res) => {
                reducerActions.addImage(res);
            }).catch(()=>{
                console.log('take picture')
            });


            // cameraRef.current.takePictureAsync({
            //     //exif: true,
            //     skipProcessing: true,
            //     onPictureSaved: async (capture) => {
            //         const asset = await saveToMediaLibrary(capture);
            //         asset.processed = false;
            //
            //         // ImagesDB.create(asset).then((res) => {
            //         //     asset.id = res.id;
            //         //     setFaceData(asset);
            //         //     addToGallery({
            //         //         id: res.id,
            //         //         ...image
            //         //     });
            //         // });
            //     }
            // });
        }
    };

//     const saveToMediaLibrary = async (photo) => {
//         const asset = await createAssetAsync(photo.uri);
//         //Move asset to album, can't create empty album on Android
//         // //"-280988523"
//         // console.log('- - - - - - -');
// // console.log(asset)
//         // await createAlbumAsync(ALBUM_NAME, asset, true)
//         //     .then(({id}) => {
//         //         MediaLibrary.getAssetsAsync({
//         //             album: id
//         //         }).then(({assets}) => {
//         //             //console.log(assets[assets.length -1]);
//         //             assets.forEach((a) => {
//         //                 if(a.filename === asset.filename) {
//         //                     console.log(a);
//         //                 }
//         //             })
//         //             console.log('- - - - - - -');
//         //         });
//         //     })
//         //     .catch(error => console.warn(error.message));
//
//         photo.assetID = asset.id;
//         return photo;
//     };

    if (!mediaLibraryPermission) {
        return (
            <View style={CameraStyles.bottomBarActions}>
                <Text>Media Library Permissions Required</Text>
            </View>
        );
    }

    return (
        <View style={CameraStyles.bottomBarActions}>
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Toggle Camera Source"
                accessibilityHint={`Switch to ${cameraSource === Camera.Constants.Type.front ? 'front' : 'back'} camera`}
                onPress={toggleCameraSource}
                style={CameraStyles.bottomBarActions.item.portrait}
            >
                <IconMat name={icons.camera} size={iconSize / 1.9} color={"#fff"}/>
            </TouchableOpacity>
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Take photograph"
                onPress={takePicture}
                style={CameraStyles.bottomBarActions.item.portrait}
            >
                <IconMat name={ICONS.CAMERA_SHUTTER} size={iconSize} color={"#fff"}/>
            </TouchableOpacity>
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="Toggle flash setting"
                accessibilityHint={`Flash is ${flash}`}
                onPress={toggleFlash}
                style={CameraStyles.bottomBarActions.item.portrait}
            >
                <IconMat name={icons.flash} size={iconSize / 1.9} color={"#fff"}/>
            </TouchableOpacity>
        </View>
    );
};

export default Actions;