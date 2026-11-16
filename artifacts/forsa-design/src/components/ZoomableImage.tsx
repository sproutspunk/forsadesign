import React, { useEffect, useRef, useState, type ComponentProps } from "react";

type Props = ComponentProps<"img"> & { lang: "pl" | "en" };

export default function ZoomableImage({ lang, alt, ...props }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const previousOverflow = useRef("");
  useEffect(() => {
    const element = dialog.current;
    return () => {
      if (element?.open) document.body.style.overflow = previousOverflow.current;
    };
  }, []);
  const labels =
    lang === "pl"
      ? { open: "Powiększ zdjęcie", close: "Zamknij", zoom: "Powiększ", fit: "Dopasuj" }
      : { open: "Enlarge image", close: "Close", zoom: "Zoom in", fit: "Fit image" };

  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        className="block w-full cursor-zoom-in rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
        aria-label={`${labels.open}: ${alt ?? ""}`}
        onClick={() => {
          previousOverflow.current = document.body.style.overflow;
          dialog.current?.showModal();
          document.body.style.overflow = "hidden";
        }}
      >
        <img {...props} alt={alt} />
      </button>
      <dialog
        ref={dialog}
        aria-label={alt || labels.open}
        className="fixed inset-0 m-auto open:flex flex-col w-[96vw] max-w-none h-[94dvh] max-h-none p-0 rounded-lg border border-primary/30 bg-background/90 text-foreground shadow-2xl backdrop-blur-md backdrop:bg-background/75 backdrop:backdrop-blur-sm"
        onClose={() => {
          setZoomed(false);
          document.body.style.overflow = previousOverflow.current;
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex shrink-0 items-center justify-end gap-3 p-3 sm:px-5 border-b border-primary/20 bg-card/60">
          <button
            type="button"
            className="min-h-11 px-4 py-2 text-sm font-medium text-primary border border-primary/40 rounded-md bg-background/50 transition-colors hover:bg-primary/10 hover:border-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            onClick={() => setZoomed(!zoomed)}
          >
            {zoomed ? labels.fit : labels.zoom}
          </button>
          <button
            type="button"
            autoFocus
            className="min-h-11 px-4 py-2 text-sm font-medium text-primary border border-primary/40 rounded-md bg-background/50 transition-colors hover:bg-primary/10 hover:border-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            onClick={close}
          >
            {labels.close} ×
          </button>
        </div>
        <div
          className="min-h-0 flex-1 overflow-auto p-3 sm:p-5"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <img
            src={props.src}
            alt={alt}
            className={
              zoomed
                ? "block max-w-none h-auto mx-auto cursor-zoom-out"
                : "block w-full h-full object-contain cursor-zoom-in"
            }
            style={zoomed ? { width: "200%" } : undefined}
            onClick={() => setZoomed(!zoomed)}
          />
        </div>
      </dialog>
    </>
  );
}
