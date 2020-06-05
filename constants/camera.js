const FLASH_ORDER = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const FLASH_ICONS = {
    off: 'flash-off',
    on: 'flash-on',
    auto: 'flash-auto',
    torch: 'highlight'
};

const WB_ORDER = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

const WB_ICONS = {
    auto: 'wb-auto',
    sunny: 'wb-sunny',
    cloudy: 'wb-cloudy',
    shadow: 'beach-access',
    fluorescent: 'wb-iridescent',
    incandescent: 'wb-incandescent',
};

export {FLASH_ORDER, FLASH_ICONS, WB_ORDER, WB_ICONS}