import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
	const directoryPath = path.join(process.cwd(), "json");
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			return res.status(500).json({ error: "Unable to scan directory" });
		}
		res.status(200).json({ files, count: files.length });
	});
}
