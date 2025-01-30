import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, "src/styles")],
		additionalData: `
		@use "_variables" as *
		@use "_mixins" as *`,
	},
	pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};

export default nextConfig;
