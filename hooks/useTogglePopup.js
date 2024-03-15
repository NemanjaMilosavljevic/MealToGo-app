"use client";
import { useCallback, useState } from "react";

const useTogglePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const toggleHandler = useCallback(
    (identificator) => {
      if (showPopup && typeof identificator === "number") {
        return;
      }
      setShowPopup((prevState) => !prevState);
    },
    [showPopup]
  );

  return [showPopup, toggleHandler];
};

export default useTogglePopup;
