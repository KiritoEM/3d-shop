"use client";

import { FC, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import useShopStore from "@/features/shop/store/shopStore";

type LoaderProps = {
    type?: "progress" | "loading";
};

const Loader: FC<LoaderProps> = ({ type = "progress" }) => {
    const { setIsModelLoaded } = useShopStore();
    const { progress } = useProgress();

    useEffect(() => {
        if (progress === 100) {
            setIsModelLoaded(true);
        }
    }, [progress]);

    const renderContent = () => {
        switch (type) {
            case "progress":
                return (
                    <p className="font-michroma mt-2 text-base opacity-70">
                        {progress.toFixed(0)} %
                    </p>
                );
            case "loading":
                return (
                    <p className="font-michroma mt-2 text-base opacity-70">
                        Chargement du model...
                    </p>
                );
        }
    };
    return (
        <div className="product-loader absolute inset-0 z-40 flex h-full w-full items-center justify-center bg-transparent text-white">
            <div className="flex flex-col items-center space-y-2">
                <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-current"></div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Loader;
