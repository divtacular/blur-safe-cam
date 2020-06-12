const FLASH_ORDER = {
    off: 'off',
    on: 'on',
    auto: 'auto',
    torch: 'torch',
};

const WB_ORDER = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

const ICONS = {
    CAMERA_SHUTTER: 'camera',
    CAMERA_SOURCE_ICONS: {
        front: 'camera-front',
        rear: 'camera-rear'
    },
    FLASH_ICONS: {
        off: 'flash-off',
        on: 'flash-on',
        auto: 'flash-auto',
        torch: 'highlight'
    },
    WB_ICONS: {
        auto: 'wb-auto',
        sunny: 'wb-sunny',
        cloudy: 'wb-cloudy',
        shadow: 'beach-access',
        fluorescent: 'wb-iridescent',
        incandescent: 'wb-incandescent',
    }
}

export {FLASH_ORDER, WB_ORDER, ICONS}