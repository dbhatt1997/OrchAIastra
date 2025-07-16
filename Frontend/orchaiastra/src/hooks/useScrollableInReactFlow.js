import { useRef, useEffect } from "react";

export const useScrollableInReactFlow = () => {
  const scrollableRef = useRef(null);

  useEffect(() => {
    const element = scrollableRef.current;
    if (!element) return;

    const handleWheel = (e) => {
      e.stopPropagation();
    };

    const handlePointerDown = (e) => {
      e.stopPropagation();
    };

    const handleMouseDown = (e) => {
      e.stopPropagation();
    };

    const handleTouchStart = (e) => {
      e.stopPropagation();
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("touchstart", handleTouchStart);

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return scrollableRef;
};
