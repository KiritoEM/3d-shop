"use client";

import { FC } from "react";
import { useProgress } from "@react-three/drei";

const Loader: FC = () => {
    const { progress } = useProgress();
    return (
        <div className="product-loader absolute inset-0 z-40 flex h-full w-full items-center justify-center bg-transparent text-white">
            <div className="flex flex-col items-center space-y-2">
                <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-current"></div>
                <p className="font-michroma mt-2 text-base opacity-70">
                    {progress.toFixed(0)} %
                </p>
            </div>
        </div>
    );
};

export default Loader;
