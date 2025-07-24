"use client";

import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Euro } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useStepper } from "@/store/stepper";
import {
    addProductSchema,
    IAddProductSchema,
} from "@/lib/zod-schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputWithIcon } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchCategories } from "@/features/shop/services/categoryServices";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSidebar } from "@/store/sidebar";

const AddProductForm = (): JSX.Element => {
    const { data: categories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });
    const { setStep, setFormData, formData } = useStepper();
    const form = useForm<IAddProductSchema>({
        resolver: zodResolver(addProductSchema),
    });
    const { setSidebarState } = useSidebar();

    const onSubmit = (data: IAddProductSchema) => {
        Object.entries(data).forEach(([key, value]) => {
            setFormData({ key, value });
        });
        setStep(2);
        setSidebarState(true);
    };

    return (
        <Form {...form}>
            <div className="product-form mb-4 w-[400px]">
                <h3 className="font-michroma text-center text-xl leading-tight">
                    Ajouter les informations sur <br />
                    le produit
                </h3>

                {isCategoriesLoading ? (
                    <div className="loading-spinner mt-12 grid w-full place-content-center">
                        <div className="h-9 w-9 animate-spin rounded-full border-b-2 border-current"></div>
                    </div>
                ) : (
                    <form
                        className="mt-10 w-full space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Iphone 14"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Entrez une description du produit à ajouter (Maximum 250 caratères)"
                                            className="h-[130px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prix du produit</FormLabel>
                                    <FormControl>
                                        <InputWithIcon
                                            placeholder="14000"
                                            type="number"
                                            Icon={<Euro size={18.4} />}
                                            iconPlace="right"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Catégorie</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Séléctionner une catégorie" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            {categories?.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.name}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="mt-2 w-full">
                            Suivant
                        </Button>
                    </form>
                )}
            </div>
        </Form>
    );
};

export default AddProductForm;
