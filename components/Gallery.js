import React from 'react';
import {View, Text} from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";

const Gallery = () => {

    const [gallery, setGallery] = React.useState([]);

    React.useEffect(() => {
        fetch('http://jsonplaceholder.typicode.com/photos').then((res) => {
            return res.json();
        }).then((photos) => {
            photos = photos.slice(0, 10).map(({url}) => {
                return {url};
            });


            console.log(photos);
            setGallery(photos);
        });
    }, []);

    if (!gallery.length) {
        return <Text>Loading...</Text>
    }

    return (
            <GallerySwiper
                style={{flex: 1, borderWidth: 1, borderColor: 'red'}}
                initialNumToRender={2}
                sensitiveScroll={false}
                images={gallery}
            />
    );
};

export default Gallery;