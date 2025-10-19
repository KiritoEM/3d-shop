"use server";

import { revalidatePath } from "next/cache";
import { v4 as uuidV4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { uploadFileLocal } from "@/lib/uploadLocalFile";
import { isDevelopment, Prettify } from "@/lib/utils";
import {
    addProductSchema,
    IAddProductSchema,
} from "@/lib/zod-schemas/productSchema";
import { IResponseType } from "@/types";

export const createProduct = async (
    data: Prettify<
        IAddProductSchema & { model?: ArrayBuffer; groundColor: string }
    >,
): Promise<IResponseType<Product | null>> => {
    try {
        let modelPath: string | null = null;
        const { model, ...productData } = data;

        if (!("model" in data)) {
            return {
                status: "error",
                message: "Pas de model 3D séléctionné, vous devez choisir",
            };
        }

        if (!addProductSchema.safeParse(productData).success) {
            return {
                status: "error",
                message:
                    "Veuillez remplir tous les champs correctement et essayer de nouveau",
            };
        }

        //create file for model arrayBuffer
        const fileName = `model3d_${uuidV4()}.glb`;
        const modelFile = new File([data.model as ArrayBuffer], fileName, {
            type: "model/gltf",
        });

        const {
            status,
            message,
            data: modelUploadedPath,
        } = await uploadFileLocal(
            modelFile as File,
            "uploaded-models",
            fileName,
        );

        if (status === "error") {
            throw new Error();
        }

        modelPath = modelUploadedPath!;

        const createdProduct = await prisma.$transaction(async (tx) => {
            const existingProduct = await tx.product.findUnique({
                where: {
                    name: data.name,
                },
            });

            if (existingProduct) {
                throw new Error("The product already exists");
            }

            const createdProductInfo = await tx.product.create({
                data: {
                    name: productData.name,
                    description: productData.description,
                    price: Number(productData.price),
                    categoryId: Number(productData.category),
                    modelPath,
                    groundColor: data.groundColor || "#000000",
                },
            });

            return createdProductInfo;
        });

        //revalidate path
        revalidatePath("/admin/products");

        return {
            status: "success",
            message: "Produit ajouté avec succés!!!",
            data: createdProduct,
        };
    } catch (err) {
        isDevelopment &&
            console.error("Erreur lors de la création du produit:", err);

        if (err instanceof Error && err.message) {
            return {
                status: "error",
                message: "Le produit avec ce nom existe déja, essayer un autre",
            };
        }

        return {
            status: "error",
            message: "Erreur lors de la création de l'admin",
            data: null,
        };
    }
};
