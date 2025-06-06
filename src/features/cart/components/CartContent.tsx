import { cn, formatIntoPrice } from "@/lib/utils";
import { useCart } from "../hooks/useCart";
import { Fragment } from "react";
import { Trash2, WalletCards, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartItem = (): JSX.Element => {
    return (
        <article className="cart-item flex justify-between gap-6 items-center">
            <div className="left-part flex gap-4 items-center">
                <div className="cart-item__3d-preview w-[60px] h-[60px] rounded-lg border"></div>

                <div className="cart-item__content space-y-1">
                    <h5 className="text-lg md:text-xl">Iphone 16 Pro</h5>
                    <p className="text-sm md:text-base">{formatIntoPrice(1088000)} €</p>
                </div>
            </div>

            <div className="delete-item">
                <Trash2 className="text-destructive size-6" />
            </div>
        </article>
    )
}

const CartItemsList = (): JSX.Element => {
    return (
        <div className="cart-items-list flex flex-col space-y-6 mt-8">
            <CartItem />
        </div>
    )
}

const CartPaiement = (): JSX.Element => {
    return (
        <div className="w-full cart-paiement mt-8 pb-8 bg-background">
            <div className="cart-paiement__container flex items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row gap-1">
                    <p className="text-primary text-lg mr-1 font-michroma">total:</p>
                    <h5 className="text-xl">2 000 000 €</h5>
                </div>

                <Button className="rounded-full"><WalletCards /> Payer</Button>
            </div>
        </div>
    )
}

const CartContent = (): JSX.Element => {
    const { isOpenContent, setCloseContent } = useCart();
    return (
        <Fragment>
            <div className={
                cn(
                    "cart-content shadow-2xl fixed z-50 top-0 right-0 px-8 w-full max-w-[380px] md:max-w-[400px] lg:max-w-[393px] 2xl:max-w-[400px] h-screen bg-background overflow-y-auto scrollable-section transition-all duration-300 ease-out",
                    isOpenContent ? "translate-x-0" : "translate-x-[100%]"
                )
            }>
                {/* Close icon */}
                <div className="close-btn p-2 cursor-pointer rounded-lg border border-input w-fit absolute top-5 left-5" onClick={setCloseContent} title="Fermer le panier">
                    <X className="size-5" />
                </div>

                <h4 className="text-2xl md:text-3xl font-michroma mt-22">Votre panier</h4>

                <CartItemsList />

                <hr className="mt-8" />

                <CartPaiement />
            </div>

            {/* Overlay */}
            {
                isOpenContent && (
                    <div className="cart-overlay fixed z-40 top-0 left-0 w-screen h-screen bg-white/40 backdrop-blur-xs" onClick={() => setCloseContent()} />
                )
            }
        </Fragment>
    );
};

export default CartContent;