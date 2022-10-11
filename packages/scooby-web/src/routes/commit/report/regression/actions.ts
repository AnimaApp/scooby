import { ImageEntry } from "../../../../components/ImageEntryList";

export type SelectEntryAction = { type: "select-entry"; entry: ImageEntry };

export type Action = SelectEntryAction;
