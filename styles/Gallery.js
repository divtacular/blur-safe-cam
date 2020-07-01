const GalleryStyles = {
    blurActions: {
        backgroundColor: 'rgba(17,17,17,0.9)',
        flexDirection: 'row',


        wrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
        },

        actionItem: {
            portrait: {
                flex: 5,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'flex-start',
            }
        },

        item: {
            portrait: {
                flex: 1,
                padding: 10,
                position: 'relative',
            }
        }
    },
    bottomBarActions: {
        backgroundColor: 'rgba(17,17,17,0.9)',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        wrapper: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },

        item: {
            portrait: {
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1,
                padding: 10,
                position: 'relative',
                width: 64,
            }
        },
        icons: {
            fontSize: 56,

            portrait: {
                fontSize: 56,
            },
            landscape: {
                fontSize: 32,
            }
        }
    }
}

export default GalleryStyles;