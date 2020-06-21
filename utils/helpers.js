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

export const scaledImageDimensionsInView = ({originalImageDimensions, viewDimensions}) => {
    const {orgWidth, orgHeight} = originalImageDimensions;

    const viewHeight = viewDimensions.height;
    const viewWidth = viewDimensions.width;

    if (orgWidth > orgHeight) { //landscape
        const scaledHeight = viewWidth * orgHeight / orgWidth;
        return {
            width: viewWidth,
            height: scaledHeight
        };
    } else { //portrait
        const scaledWidth = viewHeight * orgWidth / orgHeight;
        return {
            scaledWidth: scaledWidth,
            scaledHeight: viewHeight
        };
    }
}

export const scaleAndPositionFaceBlurRelatively = ({
                                                       originalImageDimensions,
                                                       viewDimensions,
                                                       faceImage
                                                   }) => {

    const {orgHeight, orgWidth} = originalImageDimensions

    const {scaledWidth, scaledHeight} = scaledImageDimensionsInView({
        originalImageDimensions,
        viewDimensions
    });

    const offsetTop = ((faceImage.y / orgHeight) * scaledHeight) + ((viewDimensions.height - scaledHeight) / 2);
    const offsetLeft = ((faceImage.x / orgWidth) * scaledWidth) + ((viewDimensions.width - scaledWidth) / 2);
    const height = (faceImage.height / orgHeight) * scaledHeight;
    const width = (faceImage.width / orgWidth) * scaledWidth;

    return {
        offsetTop,
        offsetLeft,
        height,
        width,
        scaledWidth,
        scaledHeight
    };

}

export const constrainCropToImageDimensions = (cropPosition, {width, height}) => {

    //x must be more than 0. Set 0.
    //y must be more than 0. Set 0.

    const validX =  cropPosition.x >= 0 ? cropPosition.x : 0;
    const validY = cropPosition.y <= width ? cropPosition.y : 0;
    const validWidth = cropPosition.x + cropPosition.width <= width ? cropPosition.width : width - cropPosition.x;
    const validHeight = cropPosition.y + cropPosition.height <= height ? cropPosition.height : height - cropPosition.y;

    return {
        x: validX,
        y: validY,
        width: validWidth,
        height: validHeight
    }
}

export const getFileNameExt = (path) => {
    return path.split('/').pop().split('.')
}
