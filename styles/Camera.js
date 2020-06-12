const CameraStyles = {
    gestureWrapper: {
        flex: 1,
        //backgroundColor: 'rgba(255,255,255,0.3)'
    },

    camera: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    previewWrapper: {
        button: {
            height: 72,
            margin: 15,
            width: 72,
        },

        image: {
            flex: 1,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.4)',
        },
    },

    bottomBarActions: {
        backgroundColor: 'rgba(17,17,17,0.9)',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        item: {
            portrait: {
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1,
                padding: 10,
                width: 64,
            }
        },

        icons: {
            fontSize: 56,
        }
    }
}

export default CameraStyles;