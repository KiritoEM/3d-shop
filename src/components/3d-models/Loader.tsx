"use client";

import { Html, useProgress } from "@react-three/drei";

const CommonLoader = (): JSX.Element => {
    const { progress } = useProgress();
    return (
        <Html center>
            <p className="font-michroma mt-2 inline-flex w-fit text-base opacity-70">
                {progress.toFixed(0)} %
            </p>
        </Html>
    );
};

export default CommonLoader;
