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
import { createCustomError } from "@/lib/error";

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
            throw createCustomError(
                "UploadError",
                "Une erreur s'est produite lors de l'upload du model 3D",
            );
        }

        modelPath = modelUploadedPath!;

        const createdProduct = await prisma.$transaction(async (tx) => {
            const existingProduct = await tx.product.findUnique({
                where: {
                    name: data.name,
                },
            });

            if (existingProduct) {
                throw createCustomError(
                    "ProductAlreadyExists",
                    "Le produit avec ce nom existe déja, essayer un autre",
                );
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

        if (err instanceof Error) {
            if (
                err.name === "ProductAlreadyExists" ||
                err.name === "UploadError"
            ) {
                return {
                    status: "error",
                    message: err.message,
                };
            }
        }

        return {
            status: "error",
            message: "Erreur lors de la création de l'admin",
            data: null,
        };
    }
};

export const deleteproductById = async (
    productId: number,
): Promise<IResponseType<boolean>> => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            throw createCustomError(
                "ProductNotFound",
                "Le produit que vous essayez de supprimer n'existe pas",
            );
        }

        const deletedProduct = await prisma.product.deleteMany({
            where: {
                id: product.id,
            },
        });

        return {
            status: "success",
            message: "Produit supprimé avec succés!!!",
            data: deletedProduct.count > 0,
        };
    } catch (err) {
        isDevelopment &&
            console.error("Erreur lors de la suppression du produit:", err);

        if (err instanceof Error) {
            if (err.name === "ProductNotFound") {
                return {
                    status: "error",
                    message: err.message,
                };
            }
        }

        return {
            status: "error",
            message:
                "Un erreur s'est produit lors de la suppression du produit",
            data: false,
        };
    }
};
