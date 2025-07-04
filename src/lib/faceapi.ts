import * as faceapi from "face-api.js";

export const loadModels = async <T>(
    handleModelLoaded: (arg?: T) => void,
    arg?: T,
) => {
    const MODEL_URL = "/models";

    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);

    handleModelLoaded(arg);
};

type IlabelFaceDescriptors = {
    image: string;
    username: string;
};

export const handleLabelFace = async <T extends IlabelFaceDescriptors>(
    data: T[],
): Promise<faceapi.LabeledFaceDescriptors[]> => {
    return await Promise.all(
        data.map(async (item) => {
            const img = await faceapi.fetchImage(item.image);

            const faceDetected = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!faceDetected) {
                throw new Error(`no faces detected for ${item.username}`);
            }

            const faceDescriptor = [faceDetected.descriptor];
            return new faceapi.LabeledFaceDescriptors(
                item.username,
                faceDescriptor,
            );
        }),
    );
};
export const compareFace = async (
    labeledDescriptors: faceapi.LabeledFaceDescriptors[],
    queryDescriptor: Float32Array,
) => {
    const threshold = 0.6;

    //initialise faceMatcher class
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, threshold);

    //match faces using euclidean distance
    const results = faceMatcher.findBestMatch(queryDescriptor);

    return {
        label: results.label,
        distance: results.distance,
    };
};
