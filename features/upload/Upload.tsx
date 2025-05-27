"use client";
import React, { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { useCartStore } from "@/store/cartStore"; // Import Zustand store
import Image from "next/image";
import { toast } from "sonner";

const Upload = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
	const [stickerSize, setStickerSize] = useState<string>("4x4");
	const [quantity, setQuantity] = useState<number>(1);

	const addToCart = useCartStore(state => state.addToCart); // Zustand action

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			setSelectedImage(file);
			setImagePreview(URL.createObjectURL(file)); // Generate preview URL
			console.log("Selected image:", file);
		}
	};

	const handleAddToCart = () => {
		if (selectedImage) {
			addToCart({
				image: selectedImage,
				size: stickerSize,
				quantity,
			});
			toast("Sticker added to cart successfully!");
		} else {
			toast("Please upload an image first.");
		}
	};

	return (
		<div className="cursor-pointer md:ml-5 flex flex-col items-center justify-center">
			<div
				onClick={handleClick}
				className="flex flex-col justify-center items-center space-y-3 md:space-y-6 h-[180px] border border-dashed bg-white border-gray-300 rounded-lg p-4 w-full"
			>
				{/* Show image preview if available, otherwise show CloudUpload icon */}
				{imagePreview ? (
					<Image
						src={imagePreview}
						alt="Preview"
						className="h-full w-full object-contain rounded-lg"
						width={100}
						height={100}
					/>
				) : (
					<>
						<CloudUpload size={75} />
						<h2 className="text-[1rem] md:text-[1.5rem] font-normal">
							Drag & Drop Browse to Upload
						</h2>
						<h2 className="text-[14px] mt-5">
							Supported files (png, jpeg, jpg)
						</h2>
					</>
				)}
			</div>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*"
				className="hidden"
			/>

			{/* Sticker Size and Quantity Inputs */}
			<div className="flex space-x-4 mt-4 w-full">
				<div className="w-full">
					<label className="font-semibold">Choose size</label>
					<select
						value={stickerSize}
						onChange={e => setStickerSize(e.target.value)}
						className="border border-gray-300 rounded-[5px] p-2 w-full bg-white"
					>
						<option value="4x4">4"x4"</option>
						<option value="3x3">3"x3"</option>
						<option value="5x5">5"x5"</option>
					</select>
				</div>
				<div className="w-full">
					<label className="font-semibold">Quantity</label>
					<input
						type="number"
						value={quantity}
						onChange={e => setQuantity(Number(e.target.value))}
						min={1}
						className="border border-gray-300 rounded-[5px] p-2 w-full bg-white"
						placeholder="Quantity"
					/>
				</div>
			</div>

			{/* Add to Cart Button */}
			<button
				onClick={handleAddToCart}
				className="bg-black cursor-pointer w-full text-white px-5 py-3 rounded-[5px] mt-4 transition duration-300 hover:bg-gray-800 hover:text-white"
			>
				Add to Cart
			</button>
		</div>
	);
};

export default Upload;
