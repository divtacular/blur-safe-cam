/**
 * @Desc format a dispatch event in the require format
 * @param type {string} - The action to perform
 * @param value {object} - The new values
 * @returns {{type: *, value: *}}
 */
export const dispatchFormatter = (type, value) => {
    return {
        type,
        value
    };
}

export const getImageDimensions = (pictureSize, {width, height}) => {

    if (width > height) {
        const scaledHeight = pictureSize * height / width;

        return {
            width: pictureSize,
            height: scaledHeight,

            scaleX: pictureSize / width,
            scaleY: scaledHeight / height,

            offsetX: 0,
            offsetY: 0, //(pictureSize - scaledHeight) / 2,
        };
    } else {
        const scaledWidth = pictureSize * width / height;

        return {
            width: scaledWidth,
            height: pictureSize,

            scaleX: scaledWidth / width,
            scaleY: pictureSize / height,

            offsetX: 0, //(pictureSize - scaledWidth) / 2,
            offsetY: 0,
        };
    }
};

export const getScaledPosDimensions = ({width, height, x, y}) => {

}

export const getFileNameExt = (path) => {
    return path.split('/').pop().split('.')
}
