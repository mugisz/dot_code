import { useCallback, useState } from "react";
import { CopyState } from "../interface/transaction";

export const useCopyToClipboard = () => {
  const [copyState, setCopyState] = useState<CopyState>({
    field: null,
    isAnimating: false,
  });

  const copyToClipboard = useCallback(
    async (text: string, fieldName: string) => {
      if (copyState.isAnimating) return;

      try {
        await navigator.clipboard.writeText(text);
        setCopyState({ field: fieldName, isAnimating: true });

        const timer = setTimeout(() => {
          setCopyState({ field: null, isAnimating: false });
        }, 2000);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Copy failed:", error);

        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
          setCopyState({ field: fieldName, isAnimating: true });
          setTimeout(
            () => setCopyState({ field: null, isAnimating: false }),
            2000
          );
        } catch (fallbackError) {
          console.error("Fallback copy failed:", fallbackError);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    },
    [copyState.isAnimating]
  );

  return { copyState, copyToClipboard };
};
