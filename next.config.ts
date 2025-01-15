import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	output: "export",
	basePath: "/nextjs-github-pages",
	images: {
		unoptimized: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "src/styles")],
		additionalData: `
		@use "_variables" as *
		@use "_mixins" as *`,
	},
};

export default nextConfig;
