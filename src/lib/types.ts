import { Settings } from "@/components/PluginSettings";
import DataEdit from "@/main";
import { Plugin } from "obsidian";

export type UpdateMetaData = (
	propertyName: string,
	propertyValue: any,
	filePath: string,
) => Promise<void>;

export type QueryResults = {
	headers: string[];
	values: any;
};

export type DataviewFile = {
	path: string;
	subpath?: string;
	type: string;
	fileName: () => string;
	obsidianLink: () => string;
};

export type CommonEditableProps = {
	propertyValue: any;
	propertyValueArrIndex: number;
	propertyValueIndex: number;
	propertyValueArr: QueryResults["values"];
	propertyName: string;
	file: DataviewFile;
	plugin: DataEdit;
	config: Settings;
	setQueryResults: React.Dispatch<
		React.SetStateAction<QueryResults | undefined>
	>;
	updateMetaData: UpdateMetaData;
};
