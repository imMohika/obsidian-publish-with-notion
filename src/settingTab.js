import { PluginSettingTab, Setting } from "obsidian";
export default class OpnSettingTab extends PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		let { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", {
			text: "Publish to Notion",
		});

		new Setting(containerEl)
			.setName("Notion Integration Token")
			.addText((text) =>
				text
					.setPlaceholder("secret_...")
					.setValue(this.plugin.settings.token)
					.onChange(async (value) => {
						this.plugin.settings.token = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl).setName("Database Id").addText((text) =>
			text
				.setPlaceholder("Database id")
				.setValue(this.plugin.settings.database)
				.onChange(async (value) => {
					this.plugin.settings.database = value;
					await this.plugin.saveSettings();
				})
		);
	}
}
