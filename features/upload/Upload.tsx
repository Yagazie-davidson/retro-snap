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

	const addGrain = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			const noise = Math.random() * 5 - 0.5; // Adjust the grain intensity
			data[i] += noise;
			data[i + 1] += noise;
			data[i + 2] += noise;
		}
		ctx.putImageData(imageData, 0, 0);
	};

	const adjustBrightnessContrast = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		brightness: number,
		contrast: number
	) => {
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;
		const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
		for (let i = 0; i < data.length; i += 4) {
			data[i] = factor * (data[i] - 128) + 128 + brightness;
			data[i + 1] = factor * (data[i + 1] - 128) + 128 + brightness;
			data[i + 2] = factor * (data[i + 2] - 128) + 128 + brightness;
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
					const maxWidth = 300;
					const maxHeight = 300;
					const border = 10;
					const bottomExtra = 40;

					let imgWidth = img.width;
					let imgHeight = img.height;
					const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
					imgWidth *= ratio;
					imgHeight *= ratio;

					const canvas = canvasRef.current;
					if (!canvas) return;

					canvas.width = imgWidth + border * 2;
					canvas.height = imgHeight + border + bottomExtra;

					const ctx = canvas.getContext("2d");
					if (!ctx) return;

					ctx.fillStyle = "white";
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					// ctx.filter = "blur(1px)";
					// ctx.drawImage(img, border, border, imgWidth, imgHeight);
					// ctx.filter = "none";
					ctx.drawImage(img, border, border, imgWidth, imgHeight); // No blur

					// adjustBrightnessContrast(ctx, canvas.width, canvas.height, 10, 15);
					adjustBrightnessContrast(ctx, canvas.width, canvas.height, 5, 10);

					addGrain(ctx, canvas.width, canvas.height);
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
