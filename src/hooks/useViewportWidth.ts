import { useState, useEffect } from "react";

export const useViewportWidth = (threshold = 768): boolean => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isWide, setIsWide] = useState<boolean>(viewportWidth > threshold);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsWide(width > threshold);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [threshold]);

  return isWide;
};

export default useViewportWidth;
