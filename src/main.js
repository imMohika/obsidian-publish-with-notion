import OpnSettingTab from "./settingTab";
import { Plugin, TFile } from "obsidian";
import { log, publishNote } from "./utils";
import { Client } from "@notionhq/client";

const DEFAULT_SETTINGS = {
	token: "",
	database: "",
};

/**
 * * Icons list
 * * 'logo-crystal', 'create-new', 'trash', 'search', 'right-triangle', 'document', 'folder', 'pencil', 'left-arrow', 'right-arrow', 'three-horizontal-bars', 'dot-network', 'audio-file', 'image-file', 'pdf-file', 'gear', 'documents', 'blocks', 'go-to-file', 'presentation', 'cross-in-box', 'microphone', 'microphone-filled', 'two-columns', 'link', 'popup-open', 'checkmark', 'hashtag', 'left-arrow-with-tail', 'right-arrow-with-tail', 'lines-of-text', 'vertical-three-dots', 'pin', 'magnifying-glass', 'info', 'horizontal-split', 'vertical-split', 'calendar-with-checkmark', 'sheets-in-box', 'up-and-down-arrows', 'broken-link', 'cross', 'any-key', 'reset', 'star', 'crossed-star', 'dice', 'filled-pin', 'enter', 'help', 'vault', 'open-vault', 'paper-plane', 'bullet-list', 'uppercase-lowercase-a', 'star-list', 'expand-vertically', 'languages', 'switch', 'pane-layout', 'install'
 */

export let PLUGIN;
export let NOTION_CLIENT;

export const pluginIcon = "documents";

export default class ObsidianPublishWithNotion extends Plugin {
	async onload() {
		log("loading plugin");
		await this.loadSettings();
		this.addSettingTab(new OpnSettingTab(this.app, this));

		PLUGIN = this;
		NOTION_CLIENT = new Client({
			auth: PLUGIN.settings.token,
			baseUrl: "https://cors.bridged.cc/https://api.notion.com",
		});

		// * Publish active note onload for faster testing
		// let activeFile = this.app.workspace.getActiveFile();
		// publishNote(activeFile);

		this.addCommand({
			id: "publish-to-notion",
			name: "Publish",
			checkCallback: (checking) => {
				let leaf = this.app.workspace.activeLeaf;
				let activeFile = this.app.workspace.getActiveFile();
				if (!leaf || !activeFile) return false;
				if (checking) return true;

				// log(leaf);
				log(activeFile);

				publishNote(activeFile);
				return true;
			},
		});

		// * Add Publish menu item to the folder context menu
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				if (file instanceof TFile) {
					menu.addItem((item) => {
						item
							.setTitle("Publish to Notion")
							.setIcon(pluginIcon)
							.onClick(() => publishNote(file));
					});
				}
			})
		);
	}

	onunload() {
		log("unloading plugin");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
