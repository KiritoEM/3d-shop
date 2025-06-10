import { CartItemTypes } from "@/features/cart/hooks/useCart";
import { stripe } from "@/lib/stripe";

export const fetchSecret = async (productsToBuy: CartItemTypes[]) => {
    try {
        if (!productsToBuy || productsToBuy.length === 0) {
            throw new Error("No products to buy");
        }

        const response = await fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                products: productsToBuy.map((product) => {
                    return {
                        id: product.id, image: product.preview3D
                    }
                })
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.client_secret;
    } catch (err) {
        console.error("Error fetching client secret:", err);
        throw err;
    }
}

export const getStripSession = async (sessionId: string) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return session;
    } catch (err) {
        console.error("Error fetching session:", err);
        return null;
    }
}