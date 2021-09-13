import { NOTION_CLIENT, PLUGIN } from "./main";
import { log } from "./utils";

// TODO Use ./utils/corsFetch instad of @notionhq/client

export async function newPage(title, blocks) {
	return NOTION_CLIENT.pages
		.create({
			parent: {
				database_id: PLUGIN.settings.database,
			},
			properties: {
				Name: {
					type: "title",
					title: [
						{
							type: "text",
							text: {
								content: title,
							},
						},
					],
				},
			},
			children: blocks,
		})
		.then((res) => {
			log(res);
			let publicUrl = res.url.replace(
				"https://www.notion.so/",
				"https://gorgeous-wilderness-7e2.notion.site/"
			);
			return publicUrl;
		});
}
