import React from 'react';
import {Text, View} from "react-native";
import {hideAsync} from 'expo-splash-screen';
import ImagesDB from "../utils/database";

const Splash = ({setIsLoaded}) => {

    React.useEffect(() => {
        // ImagesDB.dropTable().then(() => {});

        //prepare resouces, database
        //console.log('start')
        ImagesDB.createTable().then(() => {
            //setIsLoaded(true);
            console.log('db done');
        });
    }, []);

    // React.useEffect(() => {
    //     (async () => {
    //         await hideAsync().then(()=> {
    //             console.log('loading done');
    //         });
    //     })();
    // }, [isLoaded]);

    return (
        <View stlye={{flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#aabbcc'}}>
            <Text>Splashing!</Text>
        </View>
    );
};

export default Splash;