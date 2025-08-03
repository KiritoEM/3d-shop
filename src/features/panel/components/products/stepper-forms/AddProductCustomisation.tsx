"use client";

import { UploadCloud } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";
import Studio from "@/features/3d-studio/components/Studio";
import { useStudio } from "@/features/3d-studio/store/studio";
import useDragNDrop from "@/hooks/useDragNDrop";
import { cn, handleInputFileChange } from "@/lib/utils";
import { useStepper } from "@/store/stepper";
import { loadBlobModel } from "@/lib/model3d";
import { toast } from "react-toastify";
import { mode } from "crypto-js";
import { fetchApi } from "@/lib/api-utils";

type Upload3dFileProps = {
    onFileSelected: (file: File) => void;
};

const Uploader3dFile: FC<Upload3dFileProps> = ({
    onFileSelected,
}): JSX.Element => {
    const {
        isDragged,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    } = useDragNDrop(onFileSelected);

    return (
        <label
            htmlFor="3d-uploader"
            className={cn(
                "3d-uploader dark:bg-input/30 mx-auto mt-2 grid h-[194px] w-full max-w-[450px] cursor-pointer place-content-center rounded-lg border-2 border-dashed px-5 transition-all duration-100",
                isDragged ? "border-violet-400" : "border-input",
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            aria-label="Télécharger ou glisser-déposer un fichier de modèle 3D (GLB ou GLTF)"
        >
            <div className="3d-uploader__field flex h-fit w-fit flex-col items-center gap-4">
                <div className="text-background border-3 border-gray flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                    <UploadCloud className="text-background size-6" />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground text-center text-sm">
                        <span className="font-medium text-violet-400">
                            Cliquer pour télécharger
                        </span>{" "}
                        votre modèle ou{" "}
                        <span className="font-medium text-violet-400">
                            glisser le
                        </span>
                    </p>

                    <pre className="text-muted-foreground text-sm">
                        (GLB, GLTF)
                    </pre>
                </div>

                <input
                    type="file"
                    className="hidden"
                    id="3d-uploader"
                    accept=".glb,.gltf"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleInputFileChange(onFileSelected, e);
                    }}
                />
            </div>
        </label>
    );
};

const AddProductCustomisation = (): JSX.Element => {
    const { formData } = useStepper();
    const { model, setModel, setArrayBuffer } = useStudio();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // const handleFileSelected = useCallback(async (file: File) => {
    //     if (validate3DModel(file, 50 * 1024 * 1024)) {
    // const reader = new FileReader();
    // reader.onload = async () => {
    //     try {
    //         const modelFromBlob = await loadBlobModel(
    //             reader.result as ArrayBuffer,
    //         );
    //         setModel(modelFromBlob);
    //         setArrayBuffer(reader.result as ArrayBuffer);
    //     } catch (err) {
    //         isDevelopment &&
    //             console.error(
    //                 "An error was occured when loading gltf: ",
    //                 err,
    //             );
    //         toast(
    //             "Un erreur s'est produit lors du téléchargement du model",
    //             {
    //                 type: "error",
    //                 theme: "colored",
    //             },
    //         );
    //     }
    // };
    // reader.readAsArrayBuffer(file);
    // const modelFromBlob = await loadBlobModel(
    //     "/uploaded-models/iphone_16_pro_max.glb",
    // );
    // setModel(modelFromBlob);
    //     }

    // }, []);

    useEffect(() => {
        setIsLoading(true);
        const handleFetch = async () => {
            try {
                const response = await fetch(
                    "/uploaded-models/apple_watch_ultra_2.glb",
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch model: ${response.statusText}`,
                    );
                }
                const arrayBuffer = await response.arrayBuffer();
                const modelFromBlob = await loadBlobModel(arrayBuffer);
                setModel(modelFromBlob);
                setArrayBuffer(arrayBuffer);
            } catch (err) {
                console.error("Error loading model:", err);
                toast("An error occurred while loading the model", {
                    type: "error",
                    theme: "colored",
                });
            } finally {
                setIsLoading(false);
            }
        };

        handleFetch();
    }, [setModel, setArrayBuffer]);

    return (
        <div
            className={cn(
                "add-product-studio w-full overflow-hidden rounded-xl",
                "border-gray border-2",
            )}
        >
            {!isLoading && model ? (
                <Studio model={model} />
            ) : (
                <p>Chargement...</p>
            )}
            {/* {!model ? (
                <Uploader3dFile onFileSelected={handleFileSelected} />
            ) : (
                <Studio model={model} />
            )} */}
        </div>
    );
};

export default AddProductCustomisation;
