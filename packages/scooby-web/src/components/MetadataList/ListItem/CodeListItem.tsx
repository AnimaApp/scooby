import { CodeMetadata, HostedResource } from "@animaapp/scooby-shared";
import { CodeOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { PropsWithChildren, useState } from "react";
import { BaseListItem } from "./BaseListItem";
import Editor from "@monaco-editor/react";
import { useURL } from "../../../data-fetching/hooks/useURL";
import { getLanguageForFile } from "../../../utils/language";

type Props = PropsWithChildren<{
  metadata: CodeMetadata<HostedResource>;
}>;

export const CodeListItem = ({ metadata }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { source, error, isLoading } = useURL(
    isOpen ? metadata.code.url : null
  );

  function getValue(): string {
    if (isLoading || !source) {
      return "Loading...";
    } else if (error) {
      return `An error occurred: ${error}`;
    } else {
      return source;
    }
  }

  return (
    <BaseListItem name={metadata.name} description={metadata.description}>
      <Button icon={<CodeOutlined />} onClick={() => setOpen((prev) => !prev)}>
        View Code
      </Button>

      <Modal
        title={`${metadata.name} - View Code`}
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={null}
        width={"100%"}
      >
        <Editor
          height={"70vh"}
          options={{ readOnly: true }}
          language={getLanguageForFile(metadata.code.url)}
          value={getValue()}
        />
      </Modal>
    </BaseListItem>
  );
};
