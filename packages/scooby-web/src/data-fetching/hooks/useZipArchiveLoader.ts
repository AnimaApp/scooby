import { useCallback } from "react";
import { createAPI } from "../../data-fetching/api";
import { useSetAPI } from "../../data-fetching/api/provider";
import { router } from "../../router";

export function useZipArchiveLoader(): {
  loadZipArchive: (file: File) => void;
} {
  const { setApi } = useSetAPI();
  const loadZipArchive = useCallback(
    (file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const buffer = reader.result;
        if (!buffer) {
          throw new Error("unable to read buffer from file");
        }

        if (!(buffer instanceof ArrayBuffer)) {
          throw new Error("received buffer is not an ArrayBuffer");
        }

        const api = createAPI({
          environment: { zipArchive: { buffer } },
        });

        if (!api) {
          throw new Error(
            "unable to initialize API with the given zip archive"
          );
        }

        setApi(api);

        router.navigate(
          "/repo/zip-archive/commit/local-commit/report/local-report"
        );
      };
      reader.readAsArrayBuffer(file);
    },
    [setApi]
  );

  return { loadZipArchive };
}
