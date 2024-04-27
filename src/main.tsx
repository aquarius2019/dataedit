import { Notice, Plugin } from "obsidian";

import React from "react";
import { createRoot } from "react-dom/client";

import { DataEditSettingsTab } from "@/settings-tab";
import { loadData } from "@/saveload";
// import { PropertySuggester } from "@/components/Popover";

import App from "@/components/App";
import { Settings } from "./components/PluginSettings";

/**
 * Loads the dependencies (plugins) that your plugin requires
 * @returns true if successful, false if fail
 */
export const loadDependencies = async () => {
	const DATAVIEW = "dataview";
	// @ts-ignore
	const plugins = app.plugins;
	if (!plugins.enabledPlugins.has(DATAVIEW)) {
		return false;
	}
	await plugins.loadPlugin(DATAVIEW);
	return true;
};

export default class DataEdit extends Plugin {
	settings: Settings;

	onExternalSettingsChange() {
		console.log("settings were changed");
	}

	async onload(): Promise<void> {
		this.settings = await this.loadData();
		this.addSettingTab(new DataEditSettingsTab(this.app, this));

		this.registerCodeBlock();
		// this doesn't work inside my react rendered table
		// this.registerEditorSuggest(new PropertySuggester(this.app, this));

		// app.workspace.onLayoutReady(async () => {
		// 	this.registerCodeBlock();
		// });

		this.addCommand({
			id: `insert`,
			name: `Insert My Plugin`,
			editorCallback: (e, _) => {
				// e.replaceSelection("```dataedit\n```\n");
			},
			callback: () => this.registerCodeBlock(),
		});
	}

	registerCodeBlock() {
		this.registerMarkdownCodeBlockProcessor("dataedit", (s, e, ctx) => {
			console.log("registered mcbp: ", s);
			console.log("ctx: ", ctx);
			e.empty();
			const root = createRoot(e);
			root.render(
				// <React.StrictMode>
				<App
					data={s}
					getSectionInfo={() => ctx.getSectionInfo(e)}
					settings={this.settings}
					// app={this.app}
					plugin={this}
					ctx={ctx}
				/>,
				// </React.StrictMode>,
			);
		});
	}

	async updateSettings(newSettings: Settings) {
		await this.saveData(newSettings);
		this.settings = newSettings;
	}
}
