import * as z from "zod";

const productBaseSchema = z.object({
    name: z.string().min(1, "Le nom du produit est requis"),
    description: z
        .string()
        .min(1, "La description du produit est requis")
        .max(
            250,
            "La description du produit ne doit pas dépasser 250 caracteres",
        ),
    price: z.string().min(1, "Veuillez ajouter le prix du produit"),
    category: z.string().min(1, "La catégorie est requise"),
});

export const addProductSchema = productBaseSchema;

export type IAddProductSchema = z.infer<typeof productBaseSchema>;
