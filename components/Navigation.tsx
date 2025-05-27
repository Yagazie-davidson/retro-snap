"use client";
import Link from "next/link";
import React from "react";

const Navigation = () => {
	const handleScrollToUpload = () => {
		const uploadSection = document.getElementById("upload");
		uploadSection?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="flex items-center justify-between py-5 px-5 md:px-10">
			<h2 className="font-bold text-xl">STICKER PADI</h2>
			<ul className="items-center space-x-5 hidden md:flex">
				<li>
					<Link href={"/"}>Home</Link>
				</li>
				<li>
					<Link href={"/upload"}>Upload & Print</Link>
				</li>
				<li>
					<Link href={"/shop"}>Shop Design</Link>
				</li>
				<li>
					<Link href={"/contact"}>Contact</Link>
				</li>
			</ul>
			<button
				onClick={handleScrollToUpload}
				className="bg-black text-white cursor-pointer px-5 py-1.5 rounded"
			>
				Upload
			</button>
		</div>
	);
};

export default Navigation;
