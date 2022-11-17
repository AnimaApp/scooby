import { Entry } from "../../../types";

export type SelectEntryAction = { type: "select-entry"; entry: Entry };

export type Action = SelectEntryAction;
