import React from 'react';
import {Text, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import StoreProvider from "./store/StoreContext";
import GalleryContextProvider from "./contexts/galleryContext";
import DatabaseContextProvider from "./contexts/databaseContext";
import PermissionsContextProvider from "./contexts/permissionsContext";

import Camera from './components/Camera';
import Gallery from './components/Gallery';

const Stack = createStackNavigator();

const App = () => {

    return (
        <View style={{flex: 1}}>
            {/*<DebugMediaFiles setMedia={setMedia}/>*/}
            {/*<DebugDatabase setDatabase={setDatabase}/>*/}
            <StoreProvider>
                <PermissionsContextProvider>
                    <DatabaseContextProvider>
                        <GalleryContextProvider>
                            <NavigationContainer>
                                <Stack.Navigator>
                                    <Stack.Screen component={Camera} name="Camera" options={{headerShown: false}}/>
                                    <Stack.Screen component={Gallery} name="Gallery"/>
                                </Stack.Navigator>
                            </NavigationContainer>
                            {/*{<Text>asdasds</Text>}*/}
                        </GalleryContextProvider>
                    </DatabaseContextProvider>
                </PermissionsContextProvider>
            </StoreProvider>
        </View>
    );
}

export default App;