import React, {createContext} from 'react';
import * as FaceDetector from "expo-face-detector";

export const ImageContext = createContext();

const ImageContextProvider = (props) => {
    const previewState = React.useState(false);
    const processState = React.useState(false);
    const faceDataState = React.useState(false);

    const [preview, setPreview] = previewState;
    const [processQueue, setProcessQueue] = processState;
    const [faceData, setFaceData] = faceDataState;

    React.useEffect(() => {
        if (!preview) {
            return;
        }

        FaceDetector.detectFacesAsync(preview.uri, {
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100
        })
            .then((faceCoords) => {
                console.log(faceCoords);
            })
            .catch(error => console.warn(error));

    }, [preview]);

    return (
        <ImageContext.Provider value={{previewState, processQueue, faceDataState}}>
            {props.children}
        </ImageContext.Provider>
    );
}

export default ImageContextProvider;