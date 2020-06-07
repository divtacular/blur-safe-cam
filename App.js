import React from 'react';

import CameraView from './components/Camera'
import {View} from "react-native";
import CameraContextProvider from "./contexts/cameraContext";
import ImageContextProvider from "./contexts/imageContext";
import PreviewImage from "./components/PreviewImage";
import ScratchPad from "./components/ScratchPad";

const App = () => {

    return (
        <View style={{flex: 1}}>
            <ImageContextProvider>
                {/*<PreviewImage />*/}
                <ScratchPad />
                {/*/!*<CameraContextProvider>*!/*/}
                {/*    <CameraView/>*/}
                {/*</CameraContextProvider>*/}
            </ImageContextProvider>
        </View>
    );
}

export default App;
