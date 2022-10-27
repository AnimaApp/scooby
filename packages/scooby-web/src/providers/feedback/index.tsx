import React, { createContext, useContext, useMemo, useRef } from "react";
import JSConfetti from "js-confetti";

interface FeedbackContextValue {
  confetti: () => void;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export const FeedbackProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const confettiRef = useRef(new JSConfetti());

  const context = useMemo(
    (): FeedbackContextValue => ({
      confetti: () => {
        confettiRef.current.addConfetti({
          confettiColors: [
            "#1abc9c",
            "#f1c40f",
            "#f39c12",
            "#2ecc71",
            "#e74c3c",
            "#8e44ad",
          ],
          confettiRadius: 6,
          confettiNumber: 100,
        });
      },
    }),
    []
  );

  return (
    <FeedbackContext.Provider value={context}>
      {children}
    </FeedbackContext.Provider>
  );
};

export function useFeedback(): FeedbackContextValue {
  const appContext = useContext(FeedbackContext);

  if (!appContext) {
    throw new Error("uninitialized feedback context");
  }

  return appContext;
}
