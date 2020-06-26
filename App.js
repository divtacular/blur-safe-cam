import React from 'react';
import {Text, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppLoading} from 'expo';

import StoreProvider from "./store/StoreContext";
import GalleryContextProvider from "./contexts/galleryContext";
import PermissionsContextProvider from "./contexts/permissionsContext";

import Camera from './components/Camera';
import Gallery from './components/Gallery';
import ImagesDB from "./utils/database";

const Stack = createStackNavigator();

const App = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    const initialise = async () => {
        return ImagesDB.createTable(); //TODO move somewhere to reduce memory use
    };

    const cacheResources = async () => {
        //load fonts
    };

    if (!isLoaded) {
        return <AppLoading
            startAsync={initialise}
            onFinish={() => setIsLoaded(true)}
            onError={console.warn}
        />
    }

    return (
        <View style={{flex: 1}}>
            {/*<DebugMediaFiles setMedia={setMedia}/>*/}
            {/*<DebugDatabase setDatabase={setDatabase}/>*/}
            <StoreProvider>
                <PermissionsContextProvider>
                    <GalleryContextProvider>
                        <NavigationContainer>
                            <Stack.Navigator>
                                <Stack.Screen component={Camera} name="Camera" options={{headerShown: false}}/>
                                <Stack.Screen component={Gallery} name="Gallery"/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </GalleryContextProvider>
                </PermissionsContextProvider>
            </StoreProvider>
        </View>
    );
}

export default App;