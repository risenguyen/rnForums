import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  cloneElement,
  useEffect,
  useState,
  useRef,
} from "react";

import { useControlledState } from "../../hooks/use-controlled-state";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

type DialogContextType = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used within a Dialog provider");
  }

  return context;
}

type DialogProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (newOpen: boolean) => void;
};

function Dialog({
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  children,
}: DialogProps) {
  const [isOpen, setIsOpen] = useControlledState<boolean>({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

type DialogTriggerProps = {
  children: React.ReactElement<{
    onClick?: () => void;
  }>;
  asChild?: boolean;
};

function DialogTrigger({ asChild = false, children }: DialogTriggerProps) {
  const { open } = useDialog();

  if (asChild) {
    return cloneElement(children, {
      onClick() {
        open();
        children.props.onClick?.();
      },
    });
  }

  return <span onClick={open}>{children}</span>;
}

type DialogContentProps = {
  children: ReactNode;
};

function DialogContent({ children }: DialogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, close } = useDialog();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && isVisible) {
      setIsAnimating(true);
      setIsVisible(false);
    }
  }, [isOpen, isVisible]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("pointerdown", handlePointerDown);
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [close, isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, isOpen]);

  if (!isOpen && !isVisible && !isAnimating) return null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/80 transition-all duration-150",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        onTransitionEnd={() => setIsAnimating(false)}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          ref={contentRef}
          className={cn(
            "relative flex w-full max-w-md flex-col gap-4 rounded-md bg-neutral-900 px-6 py-5 transition-all duration-150",
            isVisible ? "opacity-100" : "opacity-0",
            isVisible ? "scale-none" : "scale-90",
          )}
          onTransitionEnd={() => setIsAnimating(false)}
        >
          <button
            className="absolute top-5 right-5 cursor-pointer text-neutral-200 transition-colors hover:text-neutral-200/50"
            aria-label="close dialog"
            type="button"
            onClick={close}
          >
            <X size="16px" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
}

type DialogHeaderProps = {
  children: ReactNode;
};

function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="flex flex-col">{children}</div>;
}

type DialogTitleProps = {
  children: ReactNode;
};

function DialogTitle({ children }: DialogTitleProps) {
  return <h2 className="text-lg font-medium text-neutral-200">{children}</h2>;
}

type DialogDescriptionProps = {
  children: ReactNode;
};

function DialogDescription({ children }: DialogDescriptionProps) {
  return <p className="h-min text-sm text-neutral-400">{children}</p>;
}

type DialogFooterProps = {
  children: ReactNode;
};

function DialogFooter({ children }: DialogFooterProps) {
  return <div className="flex justify-end">{children}</div>;
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
