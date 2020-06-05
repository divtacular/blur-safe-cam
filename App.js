import React from 'react';

import CameraView from './components/Camera'
import {View} from "react-native";

const App = () => {
    return (
        <View style={{flex: 1}}>
            <CameraView/>
        </View>
    );
}

export default App;
