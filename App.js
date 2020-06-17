import React from 'react';
import {View, Text} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ImageContextProvider from "./contexts/imageContext";
import DatabaseContextProvider from "./contexts/databaseContext";
import PermissionsContextProvider from "./contexts/permissionsContext";

import Camera from './components/Camera';
import Gallery from './components/Gallery';

//import install from "./utils/install";

const Stack = createStackNavigator();

//import DebugDatabase from './temp/DebugDataBase';
import {DB} from './constants/app';

const App = () => {


    return (
        <View style={{flex: 1}}>
            {/*<DebugDatabase />*/}
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