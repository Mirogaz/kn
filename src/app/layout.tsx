import "@styles/globals.sass";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
