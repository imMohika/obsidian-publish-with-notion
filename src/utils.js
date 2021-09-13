import { markdownToBlocks } from "@instantish/martian";
import { Notice } from "obsidian";
import { PLUGIN } from "./main";
import { newPage } from "./notion";

export const log = () => {};

export function publishNote(note) {
	if (PLUGIN.settings.token === "" || PLUGIN.settings.database === "") {
		new Notice("Please configure plugin");
		return false;
	}
	log(note);
	note.vault
		.read(note)
		.then((data) => newPage(note.basename, markdownToBlocks(data)))
		.then((url) => {
			require("electron").clipboard.writeText(url);
			new Notice(`Public Link copied to clipboard`);
		});
}

const corsGet = async (url) => {
	console.log(`Getting ${url} using corsGet`);
	function get(url, resolve, reject) {
		global.require("https").get(
			url,
			{
				headers: {
					Accept: "*/*",
					"Accept-Encoding": "gzip, deflate, br",
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/0.12.3 Chrome/89.0.4389.128 Electron/12.0.6 Safari/537.36",
				},
			},
			(res) => {
				// if any other status codes are returned, those needed to be added here
				if (res.statusCode === 301 || res.statusCode === 302) {
					return get(res.headers.location, resolve, reject);
				}

				const data = [];

				res
					.on("data", function (chunk) {
						data.push(chunk);
					})
					.on("end", function () {
						resolve(Buffer.concat(data));
					});
			}
		);
	}
	return await new Promise((resolve, reject) => get(url, resolve, reject));
};

export const corsFetch = async (...args) => {
	try {
		const res = await fetch(...args);
		if (!res.ok) {
			throw "Fetch was not successful.";
		}
		return res;
	} catch (e) {
		try {
			const buf = await corsGet(args[0]);
			return new Response(buf, {
				status: 200,
				statusText: "ok",
			});
		} catch (e2) {
			const combinedError = new AggregateError(
				[e, e2],
				`Fetching url ${args[0]} failed!`
			);
			console.error(combinedError);
			throw combinedError;
		}
	}
};
