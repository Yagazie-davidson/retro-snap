"use client";
import Navigation from "@/components/Navigation";
import Upload from "@/features/upload/Upload";
import { useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
	const uploadSectionRef = useRef<HTMLDivElement>(null);

	const handleScrollToUpload = () => {
		uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="relative w-full">
			<div className="absolute w-full top-10">
				<div className="flex w-full">
					<div className="bg-white w-full mx-10 md:mx-28 rounded-3xl">
						<Navigation />
					</div>
				</div>
			</div>
			<div className="">
				<div
					className="flex flex-col items-center justify-center h-screen space-y-7 "
					style={{
						backgroundColor: "#f7f7f7", // very light blue
						backgroundImage:
							"url('/bg2.png'), linear-gradient(#F0F6FF, #F0F6FF)",
						backgroundSize: "cover, cover",
						backgroundPosition: "center, center",
						backgroundRepeat: "no-repeat, no-repeat",
						backgroundBlendMode: "multiply", // or try "overlay" or "lighten"
					}}
				>
					<div className="relative w-full">
						<div>
							<motion.div
								initial={{ opacity: 0, x: 200 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.2,
									delay: 0.4,
									// ease: "easeOut",
								}}
								className="absolute top-0 right-4 md:right-36"
							>
								<p className="bg-[#FDE293] text-[#FAB32A] font-semibold px-3 py-0.5 rounded-2xl text-[0.9rem]">
									Old School
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: -300 }}
								animate={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.2,
									delay: 0.3,
									// ease: "easeOut",
								}}
								className="absolute z-40 -top-10 md:top-0  left-20 md:left-64"
							>
								<p className="bg-[#F8D8D8] text-[#EA4235] font-semibold px-3 py-0.5 rounded-2xl text-[0.9rem]">
									Nostalgic
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 200 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.2,
									delay: 0.1,
									// ease: "easeOut",
								}}
								className="absolute z-40 -bottom-96 md:-bottom-72 right-3 md:right-36"
							>
								<p className="bg-[#F1FAD5] text-[#33A854] font-semibold px-3 py-0.5 rounded-2xl text-[0.9rem]">
									Creative
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: -200, rotate: 15 }}
								animate={{ opacity: 1, x: 0, rotate: 15 }}
								transition={{
									duration: 0.3,
									delay: 0.3,
									// ease: "easeOut",
								}}
								className="absolute -top-30 md:top-0 -left-10 md:left-0"
							>
								<Image
									src={"/pola.png"}
									alt="iimage"
									width={150}
									height={150}
								/>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 200, rotate: -20 }}
								whileInView={{ opacity: 1, x: 0, rotate: -20 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.2,
									delay: 0.1,
									// ease: "easeOut",
								}}
								className="absolute -bottom-[42rem] md:-bottom-[42rem] right-0 md:right-0"
							>
								<Image
									src={"/pola.png"}
									alt="iimage"
									width={200}
									height={200}
								/>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.3,
									delay: 0.3,
									// ease: "easeOut",
								}}
								className="absolute -bottom-[20rem] md:-bottom-[32rem] left-0 md:left-72"
							>
								<Image
									src={"/camera.png"}
									alt="iimage"
									width={30}
									height={30}
								/>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: -200 }}
								animate={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.2,
									delay: 0.15,
									// ease: "easeOut",
								}}
								className="absolute -bottom-96 left-2 md:left-36"
							>
								<p className="bg-[#C1E9F3] text-[#4081ED] font-semibold px-3 py-0.5 rounded-2xl text-[0.9rem]">
									Film
								</p>
							</motion.div>
						</div>
					</div>
					<motion.h1
						viewport={{ once: true }}
						initial={{ y: 50, opacity: 0 }} // Start from below with opacity 0
						whileInView={{ y: 0, opacity: 1 }} // Move to its original position with opacity 1
						transition={{ duration: 0.8, ease: "easeOut" }} // Smooth easing and longer duration
						className="text-[2.3rem] z-50 px-[50px] md:text-[5rem] font-bold text-center md:px-[200px]"
					>
						Bring Back the Magic of Polaroids
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
						viewport={{ once: true }}
						className="text-[1.07rem] px-[30px] text-center md:px-[300px]"
					>
						Turn your digital photos into retro-styled polaroid prints in
						seconds — perfect for sharing, printing, or just reliving the vibe.
					</motion.p>
					<motion.button
						initial={{ opacity: 0, scale: 0 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.1,
							ease: "easeOut",
						}}
						onClick={handleScrollToUpload}
						className="bg-black cursor-pointer font-semibold text-white px-5 py-3 rounded-[8px] transition duration-300 hover:bg-white hover:text-black hover:border hover:border-black"
					>
						{/* Domino Animation for Each Word */}
						{["Convert", "Your", "First", "Photo", "→"].map((word, index) => (
							<motion.span
								viewport={{ once: true }}
								key={index}
								initial={{ y: 50, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								transition={{
									delay: index * 0.2, // Delay each word by 0.2s
									duration: 0.5,
									ease: "easeOut",
								}}
								className="inline-block mr-2" // Add spacing between words
							>
								{word}
							</motion.span>
						))}
					</motion.button>
					{/* <div className="flex flex-col font-light md:flex-row justify-center items-center md:space-x-5 mt-5">
						<div>Precision Die-cutting</div>
						<div>Fast Delivery</div>
						<div>High-Quality Printing</div>
					</div> */}
				</div>
				<div
					id="upload"
					ref={uploadSectionRef}
					className="z-50 flex  flex-col pb-20 md:flex-row space-y-10 md:space-y-0 md:items-start md:justify-between md:px-20 px-10 pt-10"
					style={{
						backgroundImage: "url('/bg2.png'), url('/hero-bg.svg')",
						backgroundSize: "cover, contain",
						backgroundPosition: "center, top",
						backgroundRepeat: "no-repeat, no-repeat",
					}}
				>
					<div className="w-full">
						<h2 className="text-[1.5rem] md:text-[2.5rem] font-semibold">
							How It Works
						</h2>
						<ol className="list-decimal list-inside text-[0.9rem] md:text-[1.2rem] space-y-4 md:space-y-6 mt-5">
							<li className="">Upload your image (PNG. JPG. JPEG)</li>
							{/* <li>Choose size</li> */}
							<li>Download</li>
						</ol>
					</div>
					<div className=" w-full">
						<Upload />
					</div>
				</div>
			</div>
		</div>
	);
}
