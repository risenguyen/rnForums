import { useState, useCallback } from "react";

type UseControlledStateProps<T> = {
  prop: T | undefined;
  defaultProp: T;
  onChange?: (value: T) => void;
};

function useControlledState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControlledStateProps<T>): [
  T,
  (newValue: T | ((prevValue: T) => T)) => void,
] {
  const isControlled = prop !== undefined;

  const [uncontrolledState, setUncontrolledState] = useState<T>(defaultProp);

  const value = isControlled ? prop : uncontrolledState;

  const setValue = useCallback(
    (newValue: T | ((prevValue: T) => T)) => {
      const updater =
        typeof newValue === "function"
          ? (newValue as (prevValue: T) => T)
          : () => newValue;

      if (!isControlled) {
        setUncontrolledState(updater(uncontrolledState));
      }

      if (onChange) {
        const updatedValue =
          typeof newValue === "function" ? updater(value) : newValue;

        onChange(updatedValue);
      }
    },
    [isControlled, onChange, uncontrolledState, value],
  );

  return [value, setValue];
}

export { useControlledState };
