import {
  ApartmentOutlined,
  PictureOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { BasicEntryList } from "./basic";
import { FileTreeEntryList } from "./file-tree";
import { ImageEntryList } from "./image";

export const ENTRY_LIST_MODES = {
  image: {
    name: "Image View",
    icon: PictureOutlined,
    description: "View the test entries as a list of images",
    render: ImageEntryList,
  } as const,
  basic: {
    name: "Basic View",
    icon: UnorderedListOutlined,
    description: "View the test entries as a basic list of items",
    render: BasicEntryList,
  } as const,
  fileTree: {
    name: "File Tree View",
    icon: ApartmentOutlined,
    description: "View the test entries as a file tree",
    render: FileTreeEntryList,
  } as const,
} as const;

export type Mode = keyof typeof ENTRY_LIST_MODES;
