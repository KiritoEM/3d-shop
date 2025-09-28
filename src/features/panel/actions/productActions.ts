"use server";

import { prisma } from "@/lib/prisma";
import { uploadFileLocal } from "@/lib/uploadLocalFile";
import { isDevelopment, Prettify } from "@/lib/utils";
import {
    addProductSchema,
    IAddProductSchema,
} from "@/lib/zod-schemas/productSchema";
import { IResponseType } from "@/types";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { v4 as uuidV4 } from "uuid";

export const createProduct = async (
    data: Prettify<IAddProductSchema & { model?: ArrayBuffer }>,
) => {
    console.log(data);
    // try {
    //     let modelPath: string | null = null;
    //     const { model, ...productData } = data;

    //     if (!("model" in data)) {
    //         return {
    //             status: "error",
    //             message: "Pas de model 3D séléctionné, vous devez choisir",
    //         };
    //     }

    //     if (!addProductSchema.safeParse(productData).success) {
    //         return {
    //             status: "error",
    //             message:
    //                 "Veuillez remplir tous les champs correctement et essayer de nouveau",
    //         };
    //     }

    //     //create file for model arrayBuffer
    //     const fileName = `model3d_${uuidV4()}`;
    //     const modelFile = new File(
    //         [data.model as ArrayBuffer],
    //         `${fileName}.glb`,
    //         { type: "model/gltf" },
    //     );

    //     console.log(modelFile, productData);

    //     // const {
    //     //     status,
    //     //     message,
    //     //     data: modelUploadedPath,
    //     // } = await uploadFileLocal(
    //     //     modelFile as File,
    //     //     "uploaded-models",
    //     //     fileName,
    //     // );

    //     // if (status === "error") {
    //     //     throw new Error();
    //     // }

    //     // modelPath = modelUploadedPath!;

    //     // const createdProduct = await prisma.$transaction(async (tx) => {
    //     //     const existingProduct = await tx.product.findUnique({
    //     //         where: {
    //     //             name: data.name,
    //     //         },
    //     //     });

    //     //     if (existingProduct) {
    //     //         throw new Error("The product already exists");
    //     //     }

    //     //     const createdProductInfo = await tx.product.create({
    //     //         data: {
    //     //             name: productData.name,
    //     //             description: productData.description,
    //     //             price: Number(productData.price),
    //     //             categoryId: Number(productData.category),
    //     //             modelPath,
    //     //             groundColor: "#ffffff",
    //     //         },
    //     //     });

    //     //     return createdProductInfo;
    //     // });

    //     //revalidate path
    //     // revalidatePath("/admin/products/create");

    //     return {
    //         status: "success",
    //         message: "Produit ajouté avec succés!!!",
    //         data: null,
    //     };
    // } catch (err) {
    //     isDevelopment &&
    //         console.error("Erreur lors de la création du produit:", err);

    //     if (err instanceof Error && err.message) {
    //         return {
    //             status: "error",
    //             message: "L'administrateur avec ce nom existe déja",
    //         };
    //     }

    //     return {
    //         status: "error",
    //         message: "Erreur lors de la création de l'admin",
    //         data: null,
    //     };
    // }
};
