import { useEffect, useRef } from "react";

function useIntersectionObserver<T extends HTMLElement>(
  onTrigger: () => void,
  bools: boolean[],
) {
  const trigger = useRef<T>(null);

  useEffect(() => {
    const currentTriggerRef = trigger.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && bools.every((bool) => bool)) {
        onTrigger();
      }
    });

    if (currentTriggerRef) {
      observer.observe(currentTriggerRef);
    }

    return function () {
      if (currentTriggerRef) {
        observer.unobserve(currentTriggerRef);
      }
    };
  }, [onTrigger, bools]);

  return trigger;
}

export { useIntersectionObserver };
