const CameraStyles = {
    camera: {
        flex: 1
    },

    bottomBar: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',

        item: {
            borderWidth: 1,
            borderColor: 'red',
            width: 0,
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
        },

        text: {
            fontSize: 18,
            marginBottom: 10,
            color: 'white',
            textAlign: 'center',
        }
    },

    debug: {
        background: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'white',
        position: 'absolute',
        top: 50,
        left: 25,
        padding: 10,

        text: {
            fontSize: 8,
            color: 'white',
        }
    }
}

export default CameraStyles;