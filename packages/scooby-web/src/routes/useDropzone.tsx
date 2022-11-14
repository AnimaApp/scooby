import React from "react";
import { useZipArchiveLoader } from "../data-fetching/hooks/useZipArchiveLoader";

export function useDropzone(): { isDragging: boolean } {
  const { loadZipArchive } = useZipArchiveLoader();
  const [isDragging, setIsDragging] = React.useState(false);
  const dragCounter = React.useRef(0);

  const handleDrag = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );
  const handleDragIn = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);
  const handleDragOut = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current > 0) return;
      setIsDragging(false);
    },
    []
  );
  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        dragCounter.current = 0;
        const files = event.dataTransfer.files;

        if (files.length === 1) {
          loadZipArchive(files[0]);
        } else {
          console.error("expected a single file");
          return;
        }

        event.dataTransfer.clearData();
      }
    },
    []
  );

  React.useEffect(() => {
    window.addEventListener("dragenter", handleDragIn as any);
    window.addEventListener("dragleave", handleDragOut as any);
    window.addEventListener("dragover", handleDrag as any);
    window.addEventListener("drop", handleDrop as any);
    return function cleanUp() {
      window.removeEventListener("dragenter", handleDragIn as any);
      window.removeEventListener("dragleave", handleDragOut as any);
      window.removeEventListener("dragover", handleDrag as any);
      window.removeEventListener("drop", handleDrop as any);
    };
  });

  return {
    isDragging,
  };
}
