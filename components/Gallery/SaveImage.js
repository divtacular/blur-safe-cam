import React from 'react';
import {BlurView} from 'expo-blur';
import {ActivityIndicator, Image, ImageBackground, PixelRatio, View} from "react-native";

import {cropFaces} from "../../utils/helpers";
import {captureRef} from "react-native-view-shot";
import {StoreContext} from "../../store/StoreContext";
import {createAssetAsync} from "expo-media-library";

const SaveImage = ({activeImage, setIsSaving}) => {
    const {reducerActions} = React.useContext(StoreContext);

    const imageContainer = React.useRef(null);
    const [faces, setFaces] = React.useState([]);
    const [facesRendered, setFacesRendered] = React.useState(0);

    React.useEffect(() => {
        if (activeImage.faceData && JSON.parse(activeImage.faceData).length) {
            cropFaces(activeImage, false).then((faceData) => {
                setFaces(faceData);
            });
        }
    }, [activeImage]);

    React.useEffect(() => {
        if (!!faces.length && faces.length === facesRendered) {
            takeSnapShot();
        }
    }, [facesRendered]);

    const takeSnapShot = () => {
        const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
        captureRef(imageContainer, {
            result: 'tmpfile',
            height: activeImage.height / pixelRatio,
            width: activeImage.width / pixelRatio,
            quality: 0.8,
            format: 'png',
        }).then((res) => {
            const value = {
                asset: activeImage,
                uri: res
            };
            reducerActions.saveImage(value);
            setFacesRendered(0);
            setIsSaving(false);
        }).catch(error => console.log(error));
    };

    return (
        <BlurView tint={'dark'}
                  intensity={100}
                  style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      alignItems: "center",
                      justifyContent: "center",

                  }}
        >

            <View style={{
                alignItems: "center",
                justifyContent: "center",
                height: 0,
                width: 0,
                overflow: 'hidden'
            }}>
                <ImageBackground
                    ref={imageContainer}
                    source={{uri: activeImage.uri}}
                    style={{width: activeImage.width, height: activeImage.height, resizeMode: "contain"}}
                >
                    {!!faces.length && faces.map((image, i) => {
                        return (
                            <Image
                                key={i}
                                blurRadius={20}
                                style={{
                                    top: image.y,
                                    left: image.x,
                                    height: image.height,
                                    width: image.width,
                                    position: 'absolute',
                                    borderRadius: 100,
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    borderBottomLeftRadius: 200,
                                    borderBottomRightRadius: 200
                                }}
                                source={{uri: image.uri}}
                                onLoad={() => setFacesRendered((faces) => {
                                    return faces + 1;
                                })}
                            />
                        )
                    })}
                </ImageBackground>
            </View>
        </BlurView>
    );
};

export default SaveImage;