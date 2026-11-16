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
        className="fixed inset-0 m-auto w-[96vw] max-w-none h-[94dvh] max-h-none p-0 rounded-lg border border-white/20 bg-slate-950 text-white backdrop:bg-black/85"
        onClose={() => {
          setZoomed(false);
          document.body.style.overflow = previousOverflow.current;
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex items-center justify-end gap-4 p-3 border-b border-white/20">
          <button
            type="button"
            className="px-4 py-2 border border-white/40 rounded"
            onClick={() => setZoomed(!zoomed)}
          >
            {zoomed ? labels.fit : labels.zoom}
          </button>
          <button
            type="button"
            autoFocus
            className="px-4 py-2 border border-white/40 rounded"
            onClick={close}
          >
            {labels.close} ×
          </button>
        </div>
        <div
          className="h-[calc(100%_-_5rem)] overflow-auto p-3"
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
