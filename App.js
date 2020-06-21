import React from 'react';
import {Dimensions, View, Text} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { DeviceMotion } from 'expo-sensors';


import ImageContextProvider from "./contexts/imageContext";
import DatabaseContextProvider from "./contexts/databaseContext";
import PermissionsContextProvider from "./contexts/permissionsContext";

import Camera from './components/Camera';
import Gallery from './components/Gallery';

//import install from "./utils/install";

const Stack = createStackNavigator();

// import DebugDatabase from './temp/DebugDataBase';
// import DebugMediaFiles from './temp/DebugMediaFiles';
import {DB} from './constants/app';

const App = () => {

    // ScreenOrientation.addOrientationChangeListener(({ orientationInfo: { orientation } }) => {
    //
    //     //setOrientation(orientation)
    //     console.log(orientation)
    //
    // });
    //
    // DeviceMotion.setUpdateInterval(200)
    //
    // DeviceMotion.addListener((e) => {
    //     console.log(e);
    // })
    //
    // Dimensions.addEventListener('change', (e) => {
    //     console.log(e);
    // });


    React.useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }, []);

    return (
        <View style={{flex: 1}}>
            {/*<DebugMediaFiles setMedia={setMedia}/>*/}
            {/*<DebugDatabase setDatabase={setDatabase}/>*/}
            <PermissionsContextProvider>
                <DatabaseContextProvider>
                    <ImageContextProvider>
                        <NavigationContainer>
                            <Stack.Navigator>
                                <Stack.Screen component={Camera} name="Camera" options={{headerShown: false}}/>
                                <Stack.Screen component={Gallery} name="Gallery"/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </ImageContextProvider>
                </DatabaseContextProvider>
            </PermissionsContextProvider>
        </View>
    );
}

export default App;