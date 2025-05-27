"use client";
import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

const CartPage = () => {
	// Access Zustand store
	const cart = useCartStore(state => state.cart);
	console.log("Cart items:", cart);
	const removeFromCart = useCartStore(state => state.removeFromCart);

	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const handleRemoveItem = (index: number) => {
		removeFromCart(index);
	};

	return (
		<div className="md:px-20 px-10 h-screen">
			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>
			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div className="space-y-4">
					{cart.map((item, index) => (
						<div
							key={index}
							className="flex justify-between items-center border p-4 rounded-lg"
						>
							<div>
								<p>
									<strong>Image:</strong> {item.image.name}
									{/* <Image
										src={URL.createObjectURL(item.image)}
										alt="Preview"
										className="h-full w-full object-contain rounded-lg"
										width={100}
										height={100}
									/> */}
								</p>
								<p>
									<strong>Size:</strong> {item.size}
								</p>
								<p>
									<strong>Quantity:</strong> {item.quantity}
								</p>
							</div>
							<button
								onClick={() => handleRemoveItem(index)}
								className="bg-red-500 text-white px-4 py-2 rounded-lg"
							>
								Remove
							</button>
						</div>
					))}
				</div>
			)}

			{/* Checkout Button */}
			<div className="flex justify-end">
				{cart.length > 0 && (
					<button
						onClick={() => setIsSheetOpen(true)}
						className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
					>
						Checkout
					</button>
				)}
			</div>

			{/* Checkout Sheet */}
			<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetContent className="bg-white border-none px-5">
					<SheetHeader>
						<SheetTitle>Checkout</SheetTitle>
						<SheetDescription>
							Please provide your delivery information.
						</SheetDescription>
					</SheetHeader>
					{/* Add your delivery info form here */}
					<form className="space-y-4 mt-4">
						<div>
							<label className="block font-semibold">Full Name</label>
							<input
								type="text"
								className="border border-gray-300 rounded-lg p-2 w-full"
								placeholder="Enter your full name"
							/>
						</div>
						<div>
							<label className="block font-semibold">Address</label>
							<input
								type="text"
								className="border border-gray-300 rounded-lg p-2 w-full"
								placeholder="Enter your address"
							/>
						</div>
						<div>
							<label className="block font-semibold">Phone Number</label>
							<input
								type="text"
								className="border border-gray-300 rounded-lg p-2 w-full"
								placeholder="Enter your phone number"
							/>
						</div>
						<button
							type="submit"
							className="bg-black text-white px-6 py-3 rounded-lg w-full"
						>
							Place Order
						</button>
					</form>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default CartPage;
