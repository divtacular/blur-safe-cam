import React from 'react';
import {View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {documentDirectory, makeDirectoryAsync} from 'expo-file-system';
import CameraContextProvider from "./contexts/cameraContext";
import ImageContextProvider from "./contexts/imageContext";

import Camera from './components/Camera';
import Gallery from './components/Gallery';
import {PATHS} from './constants/app';

const Stack = createStackNavigator();

const App = () => {

    //TODO: move setup file or smth
    React.useEffect(() => {
        //Create file storage
        makeDirectoryAsync(documentDirectory + PATHS.IMAGES).catch(() => {
           // dir exists
        });
    }, [])


    return (
        <View style={{flex: 1}}>
            <ImageContextProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen component={Gallery} name="Gallery"/>
                        <Stack.Screen component={Camera} name="Camera" options={{headerShown: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </ImageContextProvider>
        </View>
    );
}

export default App;