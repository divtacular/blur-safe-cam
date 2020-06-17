const GalleryStyles = {

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
                width: 64,
            }
        },
        icons: {
            fontSize: 56,

        }
    }
}

/*

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
 */

export default GalleryStyles;