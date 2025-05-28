"use client";
import React, { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";

const Upload = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [stickerSize, setStickerSize] = useState<string>("4x4");

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const applyOldPhotoEffect = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			let r = data[i];
			let g = data[i + 1];
			let b = data[i + 2];

			// Light desaturation (retain ~75% of color)
			const avg = 0.3 * r + 0.59 * g + 0.11 * b;
			r = avg + (r - avg) * 0.75;
			g = avg + (g - avg) * 0.75;
			b = avg + (b - avg) * 0.75;

			// Slight fade of shadows (lift blacks)
			const lift = 10;
			data[i] = Math.min(r + lift, 255);
			data[i + 1] = Math.min(g + lift, 255);
			data[i + 2] = Math.min(b + lift, 255);
		}

		ctx.putImageData(imageData, 0, 0);
	};
	const enhanceColors = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		saturation: number
	) => {
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];

			// Convert RGB to HSL
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const l = (max + min) / 2;

			// Boost saturation if not too light or dark
			const boost = l > 40 && l < 220 ? saturation : 0;

			// Basic saturation effect
			data[i] = r + (r - l) * boost;
			data[i + 1] = g + (g - l) * boost;
			data[i + 2] = b + (b - l) * boost;
		}

		ctx.putImageData(imageData, 0, 0);
	};

	const addGrain = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const noise = (Math.random() - 0.5) * 12; // smaller range for more subtle grain
			data[i] += noise; // red
			data[i + 1] += noise; // green
			data[i + 2] += noise; // blue
		}

		ctx.putImageData(imageData, 0, 0);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type.startsWith("image/")) {
			setImagePreview(URL.createObjectURL(file));

			const reader = new FileReader();
			reader.onload = function (evt) {
				const img = new window.Image() as HTMLImageElement;
				img.onload = function () {
					const maxWidth = 500;
					const maxHeight = 500;
					const border = 20;
					const polaroidBottom = 60;

					let imgWidth = img.width;
					let imgHeight = img.height;
					const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
					imgWidth *= ratio;
					imgHeight *= ratio;

					const canvas = canvasRef.current;
					if (!canvas) return;

					canvas.width = imgWidth + border * 2;
					canvas.height = imgHeight + border + polaroidBottom;

					const ctx = canvas.getContext("2d");
					if (!ctx) return;

					// Draw white background (polaroid frame)
					ctx.fillStyle = "#fff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					// Draw photo inside frame
					ctx.drawImage(img, border, border, imgWidth, imgHeight);

					// Apply retro photo effects
					applyOldPhotoEffect(
						ctx,
						canvas.width,
						canvas.height - polaroidBottom
					);
					addGrain(ctx, canvas.width, canvas.height - polaroidBottom);
					enhanceColors(ctx, canvas.width, canvas.height, 0.1); // low value for subtle pop

					// Optional: Add handwritten-style caption
					// ctx.fillStyle = "#000";
					// ctx.font = "italic 16px 'Comic Sans MS', cursive";
					// ctx.textAlign = "center";
					// ctx.fillText(
					// 	"Polaroid Moment ✨",
					// 	canvas.width / 2,
					// 	canvas.height - 20
					// );
				};
				if (evt.target?.result) img.src = evt.target.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDownload = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const link = document.createElement("a");
		link.download = "polaroid-photo.png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	};

	return (
		<div className="cursor-pointer md:ml-5 flex flex-col items-center justify-center">
			<div className="flex flex-col justify-center items-center space-y-3 md:space-y-6 h-[280px] border border-dashed bg-white border-gray-300 rounded-lg p-4 w-full">
				{imagePreview ? (
					<canvas ref={canvasRef} />
				) : (
					<div
						onClick={handleClick}
						className="flex flex-col items-center justify-center"
					>
						<CloudUpload size={75} />
						<h2 className="text-[1rem] md:text-[1.5rem] font-normal">
							Drag & Drop Browse to Upload
						</h2>
						<h2 className="text-[14px] mt-5">
							Supported files (png, jpeg, jpg)
						</h2>
					</div>
				)}
			</div>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*"
				className="hidden"
			/>
			{/* <div className="flex space-x-4 mt-4 w-full">
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
			</div> */}
			<button
				onClick={handleDownload}
				className="bg-black cursor-pointer w-full text-white px-5 py-3 rounded-[5px] mt-4 transition duration-300 hover:bg-gray-800 hover:text-white"
			>
				Download
			</button>
		</div>
	);
};

export default Upload;
