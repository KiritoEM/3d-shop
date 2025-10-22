"use client";

import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import { FC, useCallback, useTransition } from "react";
import Studio from "@/features/3d-studio/components/Studio";
import { useStudio } from "@/features/3d-studio/store/studio";
import useDragNDrop from "@/hooks/useDragNDrop";
import {
    cn,
    handleInputFileChange,
    isDevelopment,
    Prettify,
} from "@/lib/utils";
import { useStepper } from "@/store/stepper";
import { loadBlobModel, validate3DModel } from "@/lib/model3d";
import { createProduct } from "@/features/panel/actions/productActions";
import { IAddProductSchema } from "@/lib/zod-schemas/productSchema";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/react-query";

const AddProductCustomisation = (): JSX.Element => {
    const { formData } = useStepper();
    const { model, groundColor, setModel, setArrayBuffer } = useStudio();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    //handle select file
    const handleFileSelected = useCallback(async (file: File) => {
        if (validate3DModel(file, 50 * 1024 * 1024)) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const modelFromBlob = await loadBlobModel(
                        reader.result as ArrayBuffer,
                    );

                    setModel(modelFromBlob);
                    setArrayBuffer(reader.result as ArrayBuffer);
                } catch (err) {
                    isDevelopment &&
                        console.error(
                            "An error was occured when loading gltf: ",
                            err,
                        );
                    toast(
                        "Un erreur s'est produit lors du téléchargement du model",
                        {
                            type: "error",
                            theme: "colored",
                        },
                    );
                }
            };

            reader.readAsArrayBuffer(file);
        }
    }, []);

    //handle create product
    const handleCreateProduct = async (arrayBuffer: ArrayBuffer) => {
        startTransition(async () => {
            const isProductCreated = await createProduct({
                ...formData,
                model: arrayBuffer,
                groundColor,
            } as Prettify<
                IAddProductSchema & { model?: ArrayBuffer; groundColor: string }
            >);

            if (isProductCreated.status === "error") {
                toast(isProductCreated.message, {
                    type: "error",
                    theme: "colored",
                });
            } else {
                toast(isProductCreated.message, {
                    type: "success",
                    theme: "colored",
                });
                //reset model
                setModel(null);
                queryClient.invalidateQueries({ queryKey: ["products"] });
                router.replace("/admin/products", {});
            }
        });
    };

    return (
        <>
            {!model && <Uploader3dFile onFileSelected={handleFileSelected} />}

            {model && (
                <div
                    className={cn(
                        "add-product-studio w-full overflow-hidden rounded-xl",
                        "border-primary border-3",
                    )}
                >
                    <Studio
                        model={model}
                        isSaving={isPending}
                        onSave={handleCreateProduct}
                    />
                </div>
            )}
        </>
    );
};

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

export default AddProductCustomisation;
