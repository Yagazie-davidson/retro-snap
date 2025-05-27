import React from "react";

const Footer = () => {
	return (
		<div className="flex flex-col items-center justify-center bg-black text-white px-6 py-16">
			<ul className="flex justify-center items-center space-x-6 mb-7">
				<li>Home</li>
				<li>Contact</li>
				<li>About</li>
			</ul>
			<div>
				<h2 className="text-[3rem] md:text-[8rem] text-center font-semibold">
					RetroSnap
				</h2>
			</div>
			{/* Copyright Notice */}
			<p className="text-center text-sm mt-4">
				&copy; {new Date().getFullYear()} RetroSnap. All rights reserved.
			</p>
		</div>
	);
};

export default Footer;
