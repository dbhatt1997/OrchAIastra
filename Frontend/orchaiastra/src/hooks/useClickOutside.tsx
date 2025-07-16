import { useEffect } from "react";

import type { MutableRefObject } from "react";

type UseClickOutsideProps<T> = {
  ref: MutableRefObject<T | null>;
  condition?: boolean;
  onClickOutside: () => void;
};

const useClickOutside = <T extends HTMLElement>({
  ref,
  condition = true,
  onClickOutside,
}: UseClickOutsideProps<T>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        condition &&
        event.target instanceof Element &&
        ref?.current &&
        !ref.current.contains(event.target)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, condition, onClickOutside]);
};

export default useClickOutside;
