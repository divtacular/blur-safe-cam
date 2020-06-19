import React from 'react';
import {ImageBackground, View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";

const GalleryImage = (props) => {
    const {activeImage, blurFaces, image} = props;
    const {uri, width, height, faceData} = activeImage;
    const [viewDimensions, setViewDimensions] = React.useState([]);
    const [croppedFaces, setCroppedFaces] = React.useState(null);

    React.useEffect(() => {
        if (blurFaces && activeImage.id === image.id) {
            cropFaces();
        }
    }, []);

    const cropFaces = async () => {
        const faceCoords = (faceData && JSON.parse(faceData)) || [];
        if (!faceCoords.length) {
            return;
        }
        const faces = [];
        for (const coord of faceCoords) {
            let crop = await manipulateAsync(
                uri,
                [{
                    crop: {
                        originX: coord.x >= 0 ? coord.x : 0,
                        originY: coord.y,
                        width: coord.width,
                        height: coord.height
                    }
                }],
                {compress: 1, format: SaveFormat.JPEG}
            )
                .catch((error) => {
                    console.log(coord)

                    return console.warn(error);
                })
            faces.push({...coord, ...crop});
        }
        setCroppedFaces(faces);
    };

    return (
        <View key={props.key} style={{flex: 1, backgroundColor: '#444'}} onLayout={(event) => {
            setViewDimensions({...event.nativeEvent.layout})
        }}>
            <ImageBackground {...props}>
                {blurFaces && croppedFaces && viewDimensions && croppedFaces.map((face, i) => {

                    const t = (face.y / height) * viewDimensions.height;
                    const l = (face.x / width) * viewDimensions.width;
                    const h = (face.height / height) * viewDimensions.height;
                    const w = (face.width / width) * viewDimensions.width;

                    return (
                        <TouchableOpacity>
                            <Image
                                blurRadius={10}
                                key={i}
                                source={{uri: face.uri}}
                                style={{
                                    top: t,
                                    left: l,
                                    height: w,
                                    width: h,
                                    position: 'absolute',
                                    borderColor: 'rgba(17, 17, 17, 0.4)',
                                    borderRadius: 100,
                                    borderTopLeftRadius: 25,
                                    borderTopRightRadius: 25,
                                    borderBottomLeftRadius: 200,
                                    borderBottomRightRadius: 200,
                                    borderWidth: 2,
                                }}
                                transform={[
                                    {perspective: 600},
                                    {rotateZ: `${(face.rollAngle || 0).toFixed(0)}deg`},
                                    {rotateY: `${(face.yawAngle || 0).toFixed(0)}deg`},
                                ]}
                                // onLoad={() => {
                                //     setDrawnFaces(prevState => {
                                //         return prevState + 1;
                                //     });
                                // }}
                            />
                        </TouchableOpacity>
                    );
                })}
            </ImageBackground>
        </View>
    );
};

export default React.memo(GalleryImage);