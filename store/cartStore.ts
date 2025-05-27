import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
	image: File;
	size: string;
	quantity: number;
}

interface CartState {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (index: number) => void;
}

export const useCartStore = create<CartState>()(
	persist(
		set => ({
			cart: [],
			addToCart: item =>
				set(state => ({
					cart: [...state.cart, item],
				})),
			removeFromCart: index =>
				set(state => ({
					cart: state.cart.filter((_, i) => i !== index),
				})),
		}),
		{
			name: "cart-storage", // Name of the storage (localStorage key)
		}
	)
);
