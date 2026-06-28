const repoName = "Tutoria-Inatel-S05";
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath: isProd ? `/${repoName}` : "",
	assetPrefix: isProd ? `/${repoName}/` : "",
	images: {
		unoptimized: true,
	},
	env: {
		NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : "",
	},
};

export default nextConfig;
