import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { name } = req.query;
	const directoryPath = path.join(process.cwd(), "json");

	if (name) {
		const filePath = path.join(directoryPath, Array.isArray(name) ? name[0] : name);
		fs.readFile(filePath, "utf-8", (err, content) => {
			if (err) {
				return res.status(500).json({ error: "Unable to read file" });
			}

			res.status(200).json({ content });
		});
	} else {
		res.status(400).json({ error: "File name is required" });
	}
}
