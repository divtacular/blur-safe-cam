import React, {Component} from 'react';
//import Canvas, {Image as CanvasImage} from 'react-native-canvas';
//import Canvas, {Image as CanvasImage} from 'react-native-canvas-anonymous';
import {Text, View, Image, ScrollView} from 'react-native';
import {Asset} from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import asset from './../assets/Y8gn97i.jpg';


import {
    RadialGradient,
    ImageBackgroundPlaceholder
} from 'react-native-image-filter-kit'

const imageStyle = { width: 320, height: 320 }

const ScratchPad = () => {

    // const canvasOrig = React.useRef(null);
    // const canvasBlur = React.useRef(null);
    //
    // const [image, setImage] = React.useState(null);
    // const [faces, setFaces] = React.useState([]);

    React.useEffect(() => {
        // loadImage();
        // console.log('asdasdasd');

    }, []);

    React.useEffect(() => {
        if(!image) {
            return;
        }

        // const {width, height, base64} = image;
        // const canvas = canvasOrig.current;
        // const context = canvas.getContext('2d');
        //
        // canvas.width = width;
        // canvas.height = height;
        //
        // context.clearRect(0, 0, width, height);
        //
        // const canvasImage = new CanvasImage(canvas, height, width);
        //
        // canvasImage.src = base64;
        //
        // canvasImage.addEventListener('load', () => {
        //     console.log('image load ready');
        //     context.drawImage(canvasImage, 0, 0, 800, 600).then(() => {
        //         console.log('image rendered!');
        //         context.getImageData(90, 90, 100, 100).then((data) => {
        //             console.log('image data got')
        //         });
        //     });
        // });

    }, [image]);

    const loadImage = async () => {
        const imageAsset = Asset.fromModule(asset);
        await imageAsset.downloadAsync();

        //const base64 = await FileSystem.readAsStringAsync(image.localUri);

        setImage(imageAsset);
    };



    return (
        <RadialGradient
            colors={['red', '#00ff00', 'blue']}
            stops={[0, 0.5, 1]}
            image={
                <ImageBackgroundPlaceholder style={imageStyle}>
                    /* your content here */
                </ImageBackgroundPlaceholder>
            }
        />
    )


    return (
        <ScrollView style={{flex: 1, padding: 25}}>
            <Canvas ref={canvasOrig} style={{flex: 1, width: '100%', borderWidth: 1, borderColor: 'red'}}/>

            <View style={{height: 0, width: 0, overflow: 'hidden'}}>
                <Canvas ref={canvasBlur}/>
            </View>
        </ScrollView>
    )
}

export default ScratchPad;