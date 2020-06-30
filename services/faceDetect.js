import {Constants, detectFacesAsync} from "expo-face-detector";
import ImagesDB from "../utils/database";

const detectFaces = async (asset) => {
    if (!asset) {
        return;
    }

    return detectFacesAsync(asset.uri, {
        mode: Constants.Mode.accurate,
        detectLandmarks: Constants.Landmarks.none,
        runClassifications: Constants.Classifications.none,
        minDetectionInterval: 100
    }).then(({faces}) => {
        if (faces.length) {
            faces = faces.map((face) => {
                return ({
                    x: face.bounds.origin.x,
                    y: face.bounds.origin.y,
                    height: face.bounds.size.height,
                    width: face.bounds.size.width,
                    rollAngle: face.rollAngle,
                    yawAngle: face.yawAngle
                });
            });
        }
        //Face detect finished, do something with results
        return JSON.stringify(faces);
    });
};


const databaseActions = {
    DETECT_FACES: detectFaces
}

export default databaseActions;


