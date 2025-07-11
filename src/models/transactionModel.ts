export interface ITransaction {
    id: number;
    createdAt: string;
    updatedAt: string;
    stripePaymentIntentId?: string | null;
    stripeChargeId?: string | null;
    amount: number;
    currency: "eur";
    status: string;
    customerEmail: string;
    customerName: string;
    userId: string;
}
