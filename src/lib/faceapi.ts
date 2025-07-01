import * as faceapi from "face-api.js";

export const loadModels = async (handleModelLoaded: () => void) => {
    const MODEL_URL = "/models";

    const promises = await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);

    if (promises) {
        handleModelLoaded();
    }
};
