import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"; // Import the Toaster component

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "RetroSnap",
	description: "Turn your digital photos into retro-styled polaroid prints",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{/* Toast Notifications */}
				{/* Main Content */}
				{children}
				{/* Footer */}
				<Toaster />
				<Footer />
			</body>
		</html>
	);
}
